from fastapi import APIRouter, Depends, Request, Form, HTTPException, status
from fastapi.responses import HTMLResponse, RedirectResponse, JSONResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from database import get_db
import models
import schemas
from routers.auth import get_user, verify_password, create_access_token, get_current_user
from datetime import timedelta
from routers.auth import ACCESS_TOKEN_EXPIRE_MINUTES
import json

router = APIRouter(tags=["admin"])
templates = Jinja2Templates(directory="templates")

async def get_current_user_cookie(request: Request, db: Session = Depends(get_db)):
    token = request.cookies.get("access_token")
    if not token:
        return None
    try:
        if token.startswith("Bearer "):
            token = token[7:]
        user = await get_current_user(token, db)
        return user
    except Exception:
        return None

@router.get("/login", response_class=HTMLResponse)
async def login_page(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})

@router.post("/login")
async def login(
    request: Request, 
    username: str = Form(...), 
    password: str = Form(...), 
    db: Session = Depends(get_db)
):
    user = get_user(db, username)
    if not user or not verify_password(password, user.hashed_password):
        return templates.TemplateResponse("login.html", {"request": request, "error": "Credenciales inválidas"})
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    
    response = RedirectResponse(url="/admin", status_code=status.HTTP_302_FOUND)
    response.set_cookie(key="access_token", value=f"Bearer {access_token}", httponly=True)
    return response

@router.get("/logout")
async def logout():
    response = RedirectResponse(url="/login", status_code=status.HTTP_302_FOUND)
    response.delete_cookie("access_token")
    return response

@router.get("/admin", response_class=HTMLResponse)
async def admin_page(request: Request, db: Session = Depends(get_db)):
    user = await get_current_user_cookie(request, db)
    if not user:
        return RedirectResponse(url="/login")
    
    return templates.TemplateResponse("dashboard.html", {"request": request, "user": user})

@router.get("/admin/projects", response_class=HTMLResponse)
async def projects_page(request: Request, db: Session = Depends(get_db)):
    try:
        user = await get_current_user_cookie(request, db)
        if not user:
            return RedirectResponse(url="/login")
        
        projects = db.query(models.InvitationConfig).all()
        return templates.TemplateResponse("projects.html", {"request": request, "user": user, "projects": projects})
    except Exception as e:
        import traceback
        error_msg = traceback.format_exc()
        return HTMLResponse(f"<h1>Error Interno del Servidor</h1><pre>{error_msg}</pre>", status_code=500)

@router.post("/admin/projects/create")
async def create_project(request: Request, db: Session = Depends(get_db)):
    user = await get_current_user_cookie(request, db)
    if not user:
        return RedirectResponse(url="/login")
        
    new_project = models.InvitationConfig(
        name="Nueva Invitación",
        config_json=json.dumps({"title": "Mi Evento", "themeClass": "theme-quinceanera"})
    )
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    
    return RedirectResponse(url=f"/admin/editor/{new_project.id}", status_code=status.HTTP_303_SEE_OTHER)

@router.post("/admin/projects/delete/{project_id}")
async def delete_project(project_id: int, request: Request, db: Session = Depends(get_db)):
    user = await get_current_user_cookie(request, db)
    if not user:
        return RedirectResponse(url="/login")
        
    project = db.query(models.InvitationConfig).filter(models.InvitationConfig.id == project_id).first()
    if project:
        db.delete(project)
        db.commit()
        
    return RedirectResponse(url="/admin/projects", status_code=status.HTTP_303_SEE_OTHER)

@router.get("/admin/editor/{project_id}", response_class=HTMLResponse)
async def editor_page(project_id: int, request: Request, db: Session = Depends(get_db)):
    user = await get_current_user_cookie(request, db)
    if not user:
        return RedirectResponse(url="/login")
        
    project = db.query(models.InvitationConfig).filter(models.InvitationConfig.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Proyecto no encontrado")
    
    return templates.TemplateResponse("editor.html", {"request": request, "user": user, "project": project})

from fastapi.responses import Response

@router.get("/admin/export/{project_id}")
async def export_html(project_id: int, request: Request, db: Session = Depends(get_db)):
    user = await get_current_user_cookie(request, db)
    if not user:
        raise HTTPException(status_code=401, detail="No autorizado")
        
    project = db.query(models.InvitationConfig).filter(models.InvitationConfig.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Proyecto no encontrado")
        
    config_data = json.loads(project.config_json) if project.config_json else {}
    
    # Renderizamos la plantilla con los datos del proyecto
    rendered_html = templates.TemplateResponse("invitation.html", {
        "request": request,
        "guest": None,
        "config": config_data,
        "is_export": True # Flag para usar URLs absolutas
    }).body
    
    return Response(
        content=rendered_html,
        media_type="text/html",
        headers={"Content-Disposition": f'attachment; filename="invitacion_{project_id}.html"'}
    )

@router.post("/admin/save_config/{project_id}")
async def save_config(
    project_id: int,
    request: Request,
    db: Session = Depends(get_db)
):
    user = await get_current_user_cookie(request, db)
    if not user:
        raise HTTPException(status_code=401, detail="No autorizado")

    invitation = db.query(models.InvitationConfig).filter(models.InvitationConfig.id == project_id).first()
    if not invitation:
        raise HTTPException(status_code=404, detail="Proyecto no encontrado")
    
    config_data = await request.json()
    
    if "internalName" in config_data and config_data["internalName"]:
        invitation.name = config_data["internalName"]
        
    invitation.config_json = json.dumps(config_data)
    
    db.commit()
    return {"message": "Configuración guardada en la base de datos"}

import shutil
import os
from fastapi import UploadFile, File
import cloudinary
import cloudinary.uploader
import time

@router.post("/admin/upload_image")
async def upload_image(
    request: Request,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    user = await get_current_user_cookie(request, db)
    if not user:
        raise HTTPException(status_code=401, detail="No autorizado")
    
    cloudinary_url = os.getenv("CLOUDINARY_URL")
    
    if cloudinary_url:
        try:
            # Subir a Cloudinary
            result = cloudinary.uploader.upload(file.file, folder="invitaciones")
            return {"url": result.get("secure_url")}
        except Exception as e:
            print("Error uploading to Cloudinary, falling back to local:", str(e))
            # Reiniciar el puntero del archivo para poder leerlo otra vez
            file.file.seek(0)
            
    # Fallback a local
    upload_dir = "static/uploads"
    os.makedirs(upload_dir, exist_ok=True)
    
    # Save the file securely (using a timestamp to avoid overwrites)
    filename = f"{int(time.time())}_{file.filename}"
    file_location = f"{upload_dir}/{filename}"
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)
        
    # Return the URL path
    return {"url": f"/static/uploads/{filename}"}
