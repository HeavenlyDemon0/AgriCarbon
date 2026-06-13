# AgriCarbon

AgriCarbon is a comprehensive precision farming platform designed to empower farmers to track their impact, earn carbon credits, and receive data-driven farming recommendations.

## Project Overview
The platform provides a unified dashboard where farmers can:
- Manage their farm profile and track soil health.
- Receive personalized farming recommendations (today, weekly, seasonal).
- Monitor weather patterns and receive critical alerts.
- Manage earned carbon credits through a transparent wallet system.
- Verify sustainable farming practices to earn credits.
- Generate and share impact reports.

## Tech Stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Recharts.
- **Backend:** FastAPI (Python), Uvicorn.
- **Database/Auth:** Supabase (PostgreSQL, Authentication, Storage).

## Project Structure
```text
.
├── backend/app/          # FastAPI application logic, routers, schemas, services
├── src/                  # React frontend components, pages, context, API client
├── supabase/migrations/  # Database SQL schema and initial seed data
└── Dockerfile            # Production container configuration
```

## Setup Instructions

### 1. Supabase Configuration
1.  Create a project in the Supabase Dashboard.
2.  Open the **SQL Editor** and run the script located in `supabase/migrations/001_initial_schema.sql`.
3.  **Authentication:** Go to **Authentication > Providers > Email** and turn **OFF** "Confirm email" for easier local development.
4.  **Credentials:** Get your **Project URL**, **anon key**, and **service_role key** from **Project Settings > API**.

### 2. Environment Variables
Create a `.env` file in the project root based on the following template:
```env
SUPABASE_URL=your_project_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
CREDIT_INR_RATE=100
VERIFICATION_BUCKET=verification-images
```

### 3. Running the Backend
```bash
cd backend
python -m venv .venv
# Activate virtual environment (.venv\Scripts\activate on Windows)
pip install -r requirements.txt
uvicorn app.main:app --port 8000 --reload
```
API docs available at: `http://localhost:8000/docs`

### 4. Running the Frontend
```bash
# In project root
npm install
npm run dev
```
Frontend available at: `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/login` | Authenticate user |
| `GET` | `/api/auth/me` | Get current user profile |
| `GET` | `/api/weather` | Get current weather snapshot |
| `GET` | `/api/alerts` | Get farm alerts |
| `GET` | `/api/wallet` | Get wallet summary |
| `GET` | `/api/wallet/transactions` | Get credit transactions |
| `GET` | `/api/farm` | Get farm profile |
| `GET` | `/api/farm/impact` | Get impact metrics |
| `GET` | `/api/recommendations/*` | Get recommendations (today/week/seasonal) |
| `POST` | `/api/verification` | Submit practice verification |
| `GET` | `/api/reports` | Get user reports |
| `POST` | `/api/reports/{id}/share` | Share a report |
