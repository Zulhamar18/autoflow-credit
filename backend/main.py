from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, schemas
from services.auto_topup import check_and_topup

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/users/")
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = models.User(wallet_address=user.wallet_address, threshold=user.threshold)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/autotopup/{wallet_address}")
def trigger_topup(wallet_address: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.wallet_address == wallet_address).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    result = check_and_topup(db, user)
    return {"result": result}

@app.post("/autotopup/toggle/{wallet_address}")
def toggle_topup(wallet_address: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.wallet_address == wallet_address).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.auto_topup_enabled = not user.auto_topup_enabled
    db.commit()
    return {"message": "Auto top-up status updated", "enabled": user.auto_topup_enabled}

# Endpoint baru untuk GET status user
@app.get("/users/{wallet_address}")
def get_user_status(wallet_address: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.wallet_address == wallet_address).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {
        "wallet_address": user.wallet_address,
        "current_balance": user.current_balance,
        "threshold": user.threshold,
        "auto_topup_enabled": user.auto_topup_enabled
    }
