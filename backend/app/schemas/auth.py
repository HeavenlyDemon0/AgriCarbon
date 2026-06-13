from pydantic import BaseModel, EmailStr, Field


class SignUpRequest(BaseModel):
    name: str = Field(min_length=1)
    email: EmailStr
    password: str = Field(min_length=6)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1)


class UserProfile(BaseModel):
    id: str
    name: str
    email: str


class AuthResponse(BaseModel):
    token: str
    user: UserProfile
