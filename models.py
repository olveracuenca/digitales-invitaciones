from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship
from database import Base
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)

class InvitationConfig(Base):
    """
    Guarda la configuración general del diseño de una invitación
    """
    __tablename__ = "invitations_config"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True) # Un nombre interno para identificarla
    config_json = Column(Text) # Guardaremos la configuración en JSON

    guests = relationship("Guest", back_populates="invitation")

class Guest(Base):
    """
    Representa un invitado individual al que se le enviará un link
    """
    __tablename__ = "guests"

    id = Column(String, primary_key=True, default=generate_uuid, index=True)
    invitation_id = Column(Integer, ForeignKey("invitations_config.id"))
    name = Column(String)
    passes_allowed = Column(Integer, default=1)
    
    # Datos de RSVP
    is_confirmed = Column(Boolean, default=False)
    passes_confirmed = Column(Integer, default=0)
    rsvp_message = Column(Text, nullable=True)

    invitation = relationship("InvitationConfig", back_populates="guests")
