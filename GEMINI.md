You are a senior full-stack engineer.

Project context:
- Frontend is already built (React/Vite).
- Backend functionality is provided via Supabase directly (Data API + Auth + Storage).
- Vercel is the deployment platform.
- Supabase project is already created.
- Supabase MCP is connected and available.
- Database exists but tables/schema may need refinement.
- Supabase credentials/config details are available through MCP/environment.

Goal:
Complete the data layer implementation (Supabase schema/RLS/Edge Functions if needed) and ensure it connects seamlessly to the existing frontend.

Tech requirements:
- Supabase PostgreSQL database
- Supabase Auth
- Supabase JS/TS client
- Row Level Security (RLS)
- Vercel deployment

Before coding:
1. Inspect the entire repository.
2. Understand the frontend interaction with Supabase (`src/api/`).
3. Identify:
   - required database tables
   - relationships
   - required fields
   - validation rules (PostgreSQL constraints/RLS)

Supabase:
- Use Supabase MCP.
- Create/Refine the required database tables.
- Create relationships.
- Add constraints/indexes if needed.
- Configure Row Level Security (RLS) rigidly.
- Use Supabase Auth properly.

Implementation:
- Implement necessary SQL migrations in `supabase/migrations/`.
- Ensure frontend API calls align with the database schema and RLS policies.
- Ensure error handling and validation at the database layer (via RLS/Constraints).

Finally:
1. Validate database schema and RLS policies.
2. Ensure frontend integration is functional.
3. Provide instructions for deployment via Vercel.

Important:
Do not create a backend API layer unless explicitly required (e.g., complex business logic that cannot be handled by Supabase Data API/Edge Functions). Match frontend expectations exactly.