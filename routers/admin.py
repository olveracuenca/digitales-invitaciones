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
    
    return templates.TemplateResponse("editor.html", {"request": request, "user": user})

@router.post("/admin/generate_link")
async def generate_link(
    request: Request,
    guest_data: schemas.GuestCreate,
    db: Session = Depends(get_db)
):
    user = await get_current_user_cookie(request, db)
    if not user:
        raise HTTPException(status_code=401, detail="No autorizado")

    # Si no existe la configuración 1, la creamos (ejemplo simplificado)
    invitation = db.query(models.InvitationConfig).filter(models.InvitationConfig.id == guest_data.invitation_id).first()
    if not invitation:
        invitation = models.InvitationConfig(
            id=guest_data.invitation_id,
            name="Evento Default",
            config_json=json.dumps({"title": "Mi Evento", "themeClass": "theme-quinceanera"})
        )
        db.add(invitation)
        db.commit()

    new_guest = models.Guest(
        invitation_id=invitation.id,
        name=guest_data.name,
        passes_allowed=guest_data.passes_allowed
    )
    db.add(new_guest)
    db.commit()
    db.refresh(new_guest)

    # El link será /invitacion/{guest_id}
    link = f"{request.base_url}invitacion/{new_guest.id}"
    return JSONResponse(content={"link": link, "guest_id": new_guest.id})

@router.post("/admin/save_config")
async def save_config(
    request: Request,
    config_data: dict,
    db: Session = Depends(get_db)
):
    user = await get_current_user_cookie(request, db)
    if not user:
        raise HTTPException(status_code=401, detail="No autorizado")

    invitation = db.query(models.InvitationConfig).filter(models.InvitationConfig.id == 1).first()
    if not invitation:
        invitation = models.InvitationConfig(
            id=1,
            name="Evento Default",
            config_json=json.dumps(config_data)
        )
        db.add(invitation)
    else:
        invitation.config_json = json.dumps(config_data)
    
    db.commit()
    return {"message": "Configuración guardada en la base de datos"}

import shutil
import os
from fastapi import UploadFile, File

@router.post("/admin/upload_image")
async def upload_image(
    request: Request,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    user = await get_current_user_cookie(request, db)
    if not user:
        raise HTTPException(status_code=401, detail="No autorizado")
    
    upload_dir = "static/uploads"
    os.makedirs(upload_dir, exist_ok=True)
    
    # Save the file securely
    file_location = f"{upload_dir}/{file.filename}"
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)
        
    # Return the URL path
    return {"url": f"/static/uploads/{file.filename}"}
