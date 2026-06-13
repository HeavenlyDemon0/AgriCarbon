from typing import Literal

from pydantic import BaseModel


class Recommendation(BaseModel):
    id: str
    title: str
    description: str
    rationale: str
    cost: str
    benefit: str
    risk: str
    costIcon: str
    benefitIcon: str
    riskIcon: str
    priority: Literal["high", "medium", "low"]
    timeframe: Literal["today", "week", "season"]
