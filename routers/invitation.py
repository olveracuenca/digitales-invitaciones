from fastapi import APIRouter, Depends, Request, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from database import get_db
import models
import json

router = APIRouter(tags=["invitation"])
templates = Jinja2Templates(directory="templates")

@router.get("/invitacion/{guest_id}", response_class=HTMLResponse)
async def view_invitation(guest_id: str, request: Request, db: Session = Depends(get_db)):
    # Buscar el invitado en la base de datos
    guest = db.query(models.Guest).filter(models.Guest.id == guest_id).first()
    if not guest:
        raise HTTPException(status_code=404, detail="Invitación no encontrada")
    
    # Obtener la configuración del diseño asociado
    invitation = guest.invitation
    if not invitation:
        raise HTTPException(status_code=404, detail="Configuración no encontrada")
    
    # Pasar los datos a la plantilla
    # Asumiremos que invitation.config_json tiene el JSON con el diseño
    config_data = json.loads(invitation.config_json) if invitation.config_json else {}
    
    return templates.TemplateResponse("invitation.html", {
        "request": request,
        "guest": guest,
        "config": config_data
    })

@router.get("/invitacion/general/{config_id}", response_class=HTMLResponse)
async def view_general_invitation(config_id: str, request: Request, db: Session = Depends(get_db)):
    invitation = db.query(models.InvitationConfig).filter(models.InvitationConfig.id == config_id).first()
    if not invitation:
        raise HTTPException(status_code=404, detail="Configuración no encontrada")
    
    config_data = json.loads(invitation.config_json) if invitation.config_json else {}
    
    return templates.TemplateResponse("invitation.html", {
        "request": request,
        "guest": None,
        "config": config_data
    })
