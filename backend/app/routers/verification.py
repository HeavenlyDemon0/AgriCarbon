import uuid
from datetime import date

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status

from app.config import settings
from app.dependencies import get_current_user_id
from app.db import get_admin_client
from app.schemas.verification import PracticeType, VerificationResult
from app.services.seed import ensure_demo_data

router = APIRouter(prefix="/verification", tags=["verification"])

PRACTICE_TYPES: list[PracticeType] = [
    PracticeType(value="mulching", label="Organic Mulching", icon="🌿"),
    PracticeType(value="drip", label="Drip Irrigation", icon="💧"),
    PracticeType(value="compost", label="Composting", icon="♻️"),
    PracticeType(value="zero-till", label="Zero-Till Farming", icon="🌾"),
    PracticeType(value="tree-planting", label="Tree Planting", icon="🌳"),
    PracticeType(value="crop-rotation", label="Crop Rotation", icon="🫘"),
    PracticeType(value="residue-mgmt", label="Residue Management", icon="🔥"),
    PracticeType(value="other", label="Other", icon="📋"),
]

CREDITS_BY_PRACTICE = {
    "mulching": 3,
    "drip": 5,
    "compost": 4,
    "zero-till": 15,
    "tree-planting": 8,
    "crop-rotation": 12,
    "residue-mgmt": 6,
    "other": 2,
}

MAX_IMAGE_BYTES = 10 * 1024 * 1024


@router.get("/practice-types", response_model=list[PracticeType])
def get_practice_types(_user_id: str = Depends(get_current_user_id)) -> list[PracticeType]:
    return PRACTICE_TYPES


@router.post("", response_model=VerificationResult)
async def submit_verification(
    practice_type: str = Form(...),
    voice_confirmed: bool = Form(...),
    image: UploadFile = File(...),
    user_id: str = Depends(get_current_user_id),
) -> VerificationResult:
    if practice_type not in CREDITS_BY_PRACTICE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid practice type",
        )
    if not voice_confirmed:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Voice confirmation required",
        )
    if not image.content_type or not image.content_type.startswith("image/"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Image file required",
        )

    content = await image.read()
    if len(content) > MAX_IMAGE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Image exceeds 10MB limit",
        )

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
    farm_id = farm.data["id"] if farm.data else None

    ext = (image.filename or "upload.jpg").rsplit(".", 1)[-1]
    storage_path = f"{user_id}/{uuid.uuid4()}.{ext}"

    client.storage.from_(settings.verification_bucket).upload(
        storage_path,
        content,
        {"content-type": image.content_type or "image/jpeg"},
    )

    credits = CREDITS_BY_PRACTICE[practice_type]
    client.table("verification_submissions").insert(
        {
            "user_id": user_id,
            "farm_id": farm_id,
            "practice_type": practice_type,
            "voice_confirmed": voice_confirmed,
            "image_path": storage_path,
            "status": "pending",
            "credits_awarded": credits,
        }
    ).execute()

    practice_label = next(
        (p.label for p in PRACTICE_TYPES if p.value == practice_type),
        practice_type,
    )
    client.table("credit_transactions").insert(
        {
            "user_id": user_id,
            "farm_id": farm_id,
            "transaction_date": date.today().isoformat(),
            "type": "pending",
            "description": f"{practice_label} — Under Review",
            "credits": credits,
            "icon": next(
                (p.icon for p in PRACTICE_TYPES if p.value == practice_type),
                "📋",
            ),
        }
    ).execute()

    return VerificationResult(
        success=True,
        message="Practice verified successfully!",
        creditsAwarded=credits,
    )
