# services/auto_topup.py
from sqlalchemy.orm import Session
import models  # import langsung karena satu folder backend

def check_and_topup(db: Session, user: models.User):
    if not user.auto_topup_enabled:
        return "Top-up not enabled."

    if user.current_balance < user.threshold:
        amount = user.threshold - user.current_balance + 5.0  # buffer top-up
        # Simulasi transaksi top-up (misalnya via LI.FI atau service lainnya)
        fake_tx_hash = "0x123abc456def"

        topup = models.TopUpHistory(
            user_id=user.id,
            amount=amount,
            tx_hash=fake_tx_hash,
            status="pending"
        )
        db.add(topup)
        user.current_balance += amount
        db.commit()
        return f"Topped up {amount} USDC"
    return "Balance sufficient."

