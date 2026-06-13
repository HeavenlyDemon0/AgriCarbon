from typing import Literal

from pydantic import BaseModel


class Report(BaseModel):
    id: str
    title: str
    date: str
    icon: str
    size: str


class ShareReportRequest(BaseModel):
    target: Literal["bank", "expert"]


class ShareReportResponse(BaseModel):
    success: bool
