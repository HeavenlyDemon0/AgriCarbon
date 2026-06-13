from fastapi import APIRouter, Depends, HTTPException, status

from app.dependencies import get_current_user_id
from app.db import get_admin_client, get_anon_client
from app.schemas.auth import AuthResponse, LoginRequest, SignUpRequest, UserProfile
from app.services.seed import ensure_demo_data

router = APIRouter(prefix="/auth", tags=["auth"])


def _profile_from_user(user) -> UserProfile:
    name = user.user_metadata.get("name") if user.user_metadata else None
    if not name and user.email:
        name = user.email.split("@")[0]
    return UserProfile(id=user.id, name=name or "Farmer", email=user.email or "")


def _upsert_profile(user_id: str, name: str, email: str) -> None:
    client = get_admin_client()
    client.table("profiles").upsert(
        {"id": user_id, "name": name, "email": email},
        on_conflict="id",
    ).execute()


@router.post("/signup", response_model=AuthResponse)
def signup(body: SignUpRequest) -> AuthResponse:
    client = get_anon_client()
    try:
        result = client.auth.sign_up(
            {
                "email": body.email,
                "password": body.password,
                "options": {"data": {"name": body.name}},
            }
        )
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        ) from exc

    session = result.session
    user = result.user
    if session is None or user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Signup requires email confirmation. Disable confirmations in Supabase Auth settings for local dev, or confirm your email first.",
        )

    _upsert_profile(user.id, body.name, body.email)
    ensure_demo_data(user.id)

    return AuthResponse(
        token=session.access_token,
        user=UserProfile(id=user.id, name=body.name, email=body.email),
    )


@router.post("/login", response_model=AuthResponse)
def login(body: LoginRequest) -> AuthResponse:
    client = get_anon_client()
    try:
        result = client.auth.sign_in_with_password(
            {"email": body.email, "password": body.password}
        )
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        ) from exc

    session = result.session
    user = result.user
    if session is None or user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    profile = _profile_from_user(user)
    _upsert_profile(user.id, profile.name, profile.email)
    ensure_demo_data(user.id)

    return AuthResponse(token=session.access_token, user=profile)


@router.get("/me", response_model=UserProfile)
def me(user_id: str = Depends(get_current_user_id)) -> UserProfile:
    client = get_admin_client()
    row = client.table("profiles").select("*").eq("id", user_id).single().execute()
    if row.data:
        return UserProfile(
            id=row.data["id"],
            name=row.data["name"],
            email=row.data["email"],
        )
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile not found")
