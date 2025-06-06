# models.py

from sqlalchemy import Column, Integer, String, Float, Boolean
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    wallet_address = Column(String, unique=True, index=True)
    current_balance = Column(Float, default=0.0)
    threshold = Column(Float, default=10.0)
    auto_topup_enabled = Column(Boolean, default=True)

class TopUpHistory(Base):
    __tablename__ = "topup_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    amount = Column(Float)
    tx_hash = Column(String)
    status = Column(String)
