from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class EmployeeBase(BaseModel):
    username: str

class EmployeeCreate(EmployeeBase):
    password: str

class Employee(EmployeeBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True

class InvitationConfigBase(BaseModel):
    name: str
    config_json: str

class InvitationConfigCreate(InvitationConfigBase):
    pass

class InvitationConfig(InvitationConfigBase):
    id: int

    class Config:
        from_attributes = True

class GuestBase(BaseModel):
    name: str
    passes_allowed: int
    invitation_id: int

class GuestCreate(GuestBase):
    pass

class Guest(GuestBase):
    id: str
    is_confirmed: bool
    passes_confirmed: int
    rsvp_message: Optional[str] = None

    class Config:
        from_attributes = True
