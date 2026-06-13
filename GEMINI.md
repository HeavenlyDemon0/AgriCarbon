You are a senior backend engineer.

Analyze this entire repository first.
The frontend is already completed.
A backend folder structure is already created — DO NOT recreate or replace it.
Work inside the existing structure.

Project context:
- Frontend is already built (React/Vite).
- Backend scaffold already exists.
- Supabase project is already created.
- Supabase MCP is connected and available.
- Database exists but tables/schema are not created yet.
- Supabase credentials/config details are available through MCP/environment.

Goal:
Complete the backend implementation and connect it to the existing frontend.

Tech requirements:
- FastAPI backend
- Supabase PostgreSQL database
- Supabase Auth
- Supabase Python client
- REST APIs
- Environment variables
- CORS configuration

Before coding:

1. Inspect the entire repository.
2. Understand the existing backend folder structure.
3. Inspect frontend:
   - pages
   - components
   - forms
   - hooks
   - API calls
   - authentication flow
   - expected request/response formats

4. Identify:
   - required API endpoints
   - required database tables
   - relationships
   - required fields
   - validation rules

Supabase:
- Use Supabase MCP.
- Create the required database tables.
- Create relationships.
- Add constraints/indexes if needed.
- Configure Row Level Security where appropriate.
- Use Supabase Auth properly.

Backend implementation:
- Use the existing backend files.
- Do not delete or restructure existing files unless necessary.
- Fill missing logic.
- Add routes/services/models/schemas only where needed.
- Match frontend expectations exactly.

Implement:
- authentication
- user handling
- database operations
- all frontend-required APIs
- error handling
- validation

Also ensure:
- requirements.txt is complete
- .env.example exists
- Dockerfile works
- README has setup instructions

Finally:
1. Install dependencies.
2. Run backend locally.
3. Fix errors.
4. Test API endpoints.
5. Provide exact commands to:
   - setup environment
   - run backend
   - connect frontend
   - deploy later

Important:
Do not guess frontend requirements.
Do not create fake endpoints.
Everything must be derived from the existing code.