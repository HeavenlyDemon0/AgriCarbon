from typing import Literal

from pydantic import BaseModel


class WalletData(BaseModel):
    earned: int
    pending: int
    redeemed: int
    totalValue: str


class Transaction(BaseModel):
    id: str
    date: str
    type: Literal["earned", "pending", "redeemed"]
    description: str
    credits: int
    icon: str
