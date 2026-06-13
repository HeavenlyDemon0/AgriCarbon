from fastapi import APIRouter, Depends

from app.dependencies import get_current_user_id
from app.db import get_admin_client
from app.schemas.weather import Alert, WeatherData

router = APIRouter(tags=["weather"])


@router.get("/weather", response_model=WeatherData)
def get_weather(_user_id: str = Depends(get_current_user_id)) -> WeatherData:
    client = get_admin_client()
    row = client.table("weather_snapshots").select("*").limit(1).single().execute()
    data = row.data
    return WeatherData(
        temp=float(data["temp"]),
        condition=data["condition"],
        humidity=data["humidity"],
        windSpeed=float(data["wind_speed"]),
        icon=data["icon"],
        description=data["description"],
    )


@router.get("/alerts", response_model=list[Alert])
def get_alerts(_user_id: str = Depends(get_current_user_id)) -> list[Alert]:
    client = get_admin_client()
    rows = (
        client.table("alerts")
        .select("*")
        .order("timestamp", desc=True)
        .execute()
        .data
    )
    return [
        Alert(
            id=row["id"],
            type=row["type"],
            severity=row["severity"],
            title=row["title"],
            description=row["description"],
            timestamp=row["timestamp"],
            icon=row["icon"],
        )
        for row in rows
    ]
