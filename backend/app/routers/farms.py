from fastapi import APIRouter, Depends, HTTPException, status

from app.dependencies import get_current_user_id
from app.db import get_admin_client
from app.schemas.farms import Farm, ImpactData
from app.services.seed import ensure_demo_data

router = APIRouter(prefix="/farm", tags=["farm"])


@router.get("", response_model=Farm)
def get_farm(user_id: str = Depends(get_current_user_id)) -> Farm:
    ensure_demo_data(user_id)
    client = get_admin_client()
    row = (
        client.table("farms")
        .select("*")
        .eq("user_id", user_id)
        .limit(1)
        .single()
        .execute()
    )
    if not row.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Farm not found")

    farm = row.data
    return Farm(
        id=farm["id"],
        name=farm["name"],
        location=farm["location"],
        area=farm["area"],
        crop=farm["crop"],
        soilType=farm["soil_type"],
        season=farm["season"],
        icon=farm["icon"],
    )


@router.get("/impact", response_model=list[ImpactData])
def get_impact(user_id: str = Depends(get_current_user_id)) -> list[ImpactData]:
    ensure_demo_data(user_id)
    client = get_admin_client()
    farm = (
        client.table("farms")
        .select("id")
        .eq("user_id", user_id)
        .limit(1)
        .single()
        .execute()
    )
    if not farm.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Farm not found")

    rows = (
        client.table("impact_metrics")
        .select("*")
        .eq("farm_id", farm.data["id"])
        .execute()
        .data
    )
    return [
        ImpactData(
            metric=row["metric"],
            before=float(row["before_value"]),
            after=float(row["after_value"]),
            unit=row["unit"],
            icon=row["icon"],
            improvement=row["improvement"],
        )
        for row in rows
    ]
