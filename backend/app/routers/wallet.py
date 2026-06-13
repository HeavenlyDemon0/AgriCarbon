from fastapi import APIRouter, Depends

from app.config import settings
from app.dependencies import get_current_user_id
from app.db import get_admin_client
from app.schemas.wallet import Transaction, WalletData
from app.services.seed import ensure_demo_data

router = APIRouter(prefix="/wallet", tags=["wallet"])


def _format_inr(amount: int) -> str:
    return f"₹{amount:,}"


@router.get("", response_model=WalletData)
def get_wallet(user_id: str = Depends(get_current_user_id)) -> WalletData:
    ensure_demo_data(user_id)
    client = get_admin_client()
    rows = (
        client.table("credit_transactions")
        .select("type, credits")
        .eq("user_id", user_id)
        .execute()
        .data
    )

    earned = sum(r["credits"] for r in rows if r["type"] == "earned" and r["credits"] > 0)
    pending = sum(r["credits"] for r in rows if r["type"] == "pending" and r["credits"] > 0)
    redeemed = sum(abs(r["credits"]) for r in rows if r["type"] == "redeemed" or r["credits"] < 0)
    total_inr = earned * settings.credit_inr_rate

    return WalletData(
        earned=earned,
        pending=pending,
        redeemed=redeemed,
        totalValue=_format_inr(total_inr),
    )


@router.get("/transactions", response_model=list[Transaction])
def get_transactions(user_id: str = Depends(get_current_user_id)) -> list[Transaction]:
    ensure_demo_data(user_id)
    client = get_admin_client()
    rows = (
        client.table("credit_transactions")
        .select("*")
        .eq("user_id", user_id)
        .order("transaction_date", desc=True)
        .execute()
        .data
    )
    return [
        Transaction(
            id=row["id"],
            date=row["transaction_date"],
            type=row["type"],
            description=row["description"],
            credits=row["credits"],
            icon=row["icon"],
        )
        for row in rows
    ]
