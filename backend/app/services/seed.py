"""Seed demo farm data for a user (matches frontend mock data)."""

from app.db import get_admin_client


def ensure_demo_data(user_id: str) -> None:
    client = get_admin_client()

    existing = (
        client.table("farms")
        .select("id")
        .eq("user_id", user_id)
        .limit(1)
        .execute()
    )
    if existing.data:
        return

    farm = (
        client.table("farms")
        .insert(
            {
                "user_id": user_id,
                "name": "Green Valley Farm",
                "location": "Warangal, Telangana",
                "area": "5 Acres",
                "crop": "Rice (Kharif)",
                "soil_type": "Alluvial",
                "season": "Kharif 2026",
                "icon": "🌾",
            }
        )
        .execute()
    )
    farm_id = farm.data[0]["id"]

    impact_rows = [
        {
            "farm_id": farm_id,
            "metric": "Water Usage",
            "before_value": 100,
            "after_value": 65,
            "unit": "%",
            "icon": "💧",
            "improvement": "35% less",
        },
        {
            "farm_id": farm_id,
            "metric": "Fertilizer Cost",
            "before_value": 8000,
            "after_value": 4500,
            "unit": "₹",
            "icon": "🧪",
            "improvement": "₹3,500 saved",
        },
        {
            "farm_id": farm_id,
            "metric": "Soil Health Score",
            "before_value": 45,
            "after_value": 72,
            "unit": "/100",
            "icon": "🌍",
            "improvement": "+27 points",
        },
        {
            "farm_id": farm_id,
            "metric": "Carbon Captured",
            "before_value": 0,
            "after_value": 2.4,
            "unit": "tonnes",
            "icon": "🌱",
            "improvement": "2.4t CO₂",
        },
    ]
    client.table("impact_metrics").insert(impact_rows).execute()

    transactions = [
        {
            "user_id": user_id,
            "farm_id": farm_id,
            "transaction_date": "2026-06-12",
            "type": "earned",
            "description": "Organic Mulching Verified",
            "credits": 3,
            "icon": "🌱",
        },
        {
            "user_id": user_id,
            "farm_id": farm_id,
            "transaction_date": "2026-06-10",
            "type": "earned",
            "description": "Drip Irrigation Installed",
            "credits": 5,
            "icon": "💧",
        },
        {
            "user_id": user_id,
            "farm_id": farm_id,
            "transaction_date": "2026-06-08",
            "type": "pending",
            "description": "Compost Pit — Under Review",
            "credits": 4,
            "icon": "♻️",
        },
        {
            "user_id": user_id,
            "farm_id": farm_id,
            "transaction_date": "2026-06-05",
            "type": "redeemed",
            "description": "Redeemed for Fertilizer Subsidy",
            "credits": -8,
            "icon": "🏦",
        },
        {
            "user_id": user_id,
            "farm_id": farm_id,
            "transaction_date": "2026-06-02",
            "type": "earned",
            "description": "Zero-Till Wheat Field",
            "credits": 15,
            "icon": "🌾",
        },
        {
            "user_id": user_id,
            "farm_id": farm_id,
            "transaction_date": "2026-05-28",
            "type": "earned",
            "description": "Crop Residue Management",
            "credits": 6,
            "icon": "🔥",
        },
        {
            "user_id": user_id,
            "farm_id": farm_id,
            "transaction_date": "2026-05-20",
            "type": "pending",
            "description": "Border Tree Planting — Review",
            "credits": 8,
            "icon": "🌳",
        },
        {
            "user_id": user_id,
            "farm_id": farm_id,
            "transaction_date": "2026-05-15",
            "type": "earned",
            "description": "Soil Testing Completed",
            "credits": 2,
            "icon": "📊",
        },
    ]
    client.table("credit_transactions").insert(transactions).execute()

    reports = [
        {
            "user_id": user_id,
            "farm_id": farm_id,
            "title": "Carbon Credit Report — June 2026",
            "report_date": "2026-06-01",
            "icon": "📊",
            "size_label": "2.4 MB",
        },
        {
            "user_id": user_id,
            "farm_id": farm_id,
            "title": "Soil Health Analysis",
            "report_date": "2026-05-15",
            "icon": "🧪",
            "size_label": "1.8 MB",
        },
        {
            "user_id": user_id,
            "farm_id": farm_id,
            "title": "Farm Performance Summary — Q1",
            "report_date": "2026-04-01",
            "icon": "📈",
            "size_label": "3.1 MB",
        },
        {
            "user_id": user_id,
            "farm_id": farm_id,
            "title": "Water Usage & Savings Report",
            "report_date": "2026-03-15",
            "icon": "💧",
            "size_label": "1.2 MB",
        },
        {
            "user_id": user_id,
            "farm_id": farm_id,
            "title": "Government Scheme Eligibility",
            "report_date": "2026-03-01",
            "icon": "🏛️",
            "size_label": "0.8 MB",
        },
    ]
    client.table("reports").insert(reports).execute()
