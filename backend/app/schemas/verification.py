from pydantic import BaseModel


class PracticeType(BaseModel):
    value: str
    label: str
    icon: str


class VerificationResult(BaseModel):
    success: bool
    message: str
    creditsAwarded: int
