from pydantic import BaseModel


class Farm(BaseModel):
    id: str
    name: str
    location: str
    area: str
    crop: str
    soilType: str
    season: str
    icon: str


class ImpactData(BaseModel):
    metric: str
    before: float
    after: float
    unit: str
    icon: str
    improvement: str
