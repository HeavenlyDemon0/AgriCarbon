from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import auth, farms, recommendations, reports, verification, wallet, weather

app = FastAPI(
    title="AgriCarbon API",
    description="Backend API for the AgriCarbon farmer dashboard",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api")
app.include_router(weather.router, prefix="/api")
app.include_router(wallet.router, prefix="/api")
app.include_router(farms.router, prefix="/api")
app.include_router(recommendations.router, prefix="/api")
app.include_router(verification.router, prefix="/api")
app.include_router(reports.router, prefix="/api")


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
