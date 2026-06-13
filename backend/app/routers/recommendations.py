from fastapi import APIRouter, Depends

from app.dependencies import get_current_user_id
from app.db import get_admin_client
from app.schemas.recommendations import Recommendation

router = APIRouter(prefix="/recommendations", tags=["recommendations"])


def _map_recommendation(row: dict) -> Recommendation:
    return Recommendation(
        id=row["id"],
        title=row["title"],
        description=row["description"],
        rationale=row["rationale"],
        cost=row["cost"],
        benefit=row["benefit"],
        risk=row["risk"],
        costIcon=row["cost_icon"],
        benefitIcon=row["benefit_icon"],
        riskIcon=row["risk_icon"],
        priority=row["priority"],
        timeframe=row["timeframe"],
    )


@router.get("/today", response_model=Recommendation)
def get_today_recommendation(
    _user_id: str = Depends(get_current_user_id),
) -> Recommendation:
    client = get_admin_client()
    row = (
        client.table("recommendations")
        .select("*")
        .eq("timeframe", "today")
        .limit(1)
        .single()
        .execute()
    )
    return _map_recommendation(row.data)


@router.get("/weekly", response_model=list[Recommendation])
def get_weekly_plan(_user_id: str = Depends(get_current_user_id)) -> list[Recommendation]:
    client = get_admin_client()
    rows = (
        client.table("recommendations")
        .select("*")
        .eq("timeframe", "week")
        .order("sort_order")
        .execute()
        .data
    )
    return [_map_recommendation(row) for row in rows]


@router.get("/seasonal", response_model=list[Recommendation])
def get_seasonal_plan(_user_id: str = Depends(get_current_user_id)) -> list[Recommendation]:
    client = get_admin_client()
    rows = (
        client.table("recommendations")
        .select("*")
        .eq("timeframe", "season")
        .order("sort_order")
        .execute()
        .data
    )
    return [_map_recommendation(row) for row in rows]
