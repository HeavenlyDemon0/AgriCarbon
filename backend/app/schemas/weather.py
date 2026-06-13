from typing import Literal

from pydantic import BaseModel


class WeatherData(BaseModel):
    temp: float
    condition: Literal["sunny", "rainy", "cloudy", "storm", "drought"]
    humidity: int
    windSpeed: float
    icon: str
    description: str


class Alert(BaseModel):
    id: str
    type: Literal["weather", "pest", "drought", "flood"]
    severity: Literal["low", "medium", "high", "critical"]
    title: str
    description: str
    timestamp: str
    icon: str
