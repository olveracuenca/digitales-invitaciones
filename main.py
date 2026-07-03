from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse
import models
from database import engine, SessionLocal
from routers import auth, admin, invitation
from routers.auth import get_password_hash

# Crear las tablas de la base de datos
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Lirio Invitaciones", description="MVC Backend para invitaciones digitales")

# Montar los archivos estáticos (CSS, JS, imágenes)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Incluir los routers
app.include_router(auth.router)
app.include_router(admin.router)
app.include_router(invitation.router)

# Ruta raíz, redirige al login o panel de control
@app.get("/")
def read_root():
    return RedirectResponse(url="/admin")

# Crear un usuario administrador por defecto si no existe
def create_default_admin():
    db = SessionLocal()
    try:
        user = db.query(models.Employee).filter(models.Employee.username == "admin").first()
        if not user:
            new_user = models.Employee(
                username="admin",
                hashed_password=get_password_hash("admin123") # Cambiar en producción!
            )
            db.add(new_user)
            db.commit()
    finally:
        db.close()

create_default_admin()
