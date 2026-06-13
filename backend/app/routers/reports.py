import uuid
from datetime import date

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status

from app.config import settings
from app.dependencies import get_current_user_id
from app.db import get_admin_client
from app.schemas.reports import Report, ShareReportRequest, ShareReportResponse
from app.services.seed import ensure_demo_data

router = APIRouter(prefix="/reports", tags=["reports"])


@router.get("", response_model=list[Report])
def get_reports(user_id: str = Depends(get_current_user_id)) -> list[Report]:
    ensure_demo_data(user_id)
    client = get_admin_client()
    rows = (
        client.table("reports")
        .select("*")
        .eq("user_id", user_id)
        .order("report_date", desc=True)
        .execute()
        .data
    )
    return [
        Report(
            id=row["id"],
            title=row["title"],
            date=row["report_date"],
            icon=row["icon"],
            size=row["size_label"],
        )
        for row in rows
    ]


@router.post("/{report_id}/share", response_model=ShareReportResponse)
def share_report(
    report_id: str,
    body: ShareReportRequest,
    user_id: str = Depends(get_current_user_id),
) -> ShareReportResponse:
    ensure_demo_data(user_id)
    client = get_admin_client()
    row = (
        client.table("reports")
        .select("id")
        .eq("id", report_id)
        .eq("user_id", user_id)
        .limit(1)
        .execute()
    )
    if not row.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Report not found")

    client.table("report_shares").insert(
        {
            "report_id": report_id,
            "user_id": user_id,
            "target": body.target,
        }
    ).execute()

    return ShareReportResponse(success=True)
