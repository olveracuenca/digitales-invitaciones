import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

# Fallback a SQLite si no hay DATABASE_URL configurada
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./invitations.db")

# Si la URL es de Postgres (postgres://) arreglarla a (postgresql://) que es lo que SQLAlchemy requiere
if SQLALCHEMY_DATABASE_URL.startswith("postgresql://postgres:[cuenca15130072]@db.zljebebtljzqctmtqoma.supabase.co:5432/postgres"):
    SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace("postgres://", "postgresql://", 1)

connect_args = {}
# Solo pasamos check_same_thread para SQLite
if SQLALCHEMY_DATABASE_URL.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args=connect_args
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
