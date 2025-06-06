# app/schemas.py
from pydantic import BaseModel

class UserCreate(BaseModel):
    wallet_address: str
    threshold: float = 10.0

class UserOut(BaseModel):
    id: int
    wallet_address: str
    current_balance: float
    threshold: float
    auto_topup_enabled: bool

    class Config:
        orm_mode = True
