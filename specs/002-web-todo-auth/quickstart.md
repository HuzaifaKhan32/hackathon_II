# Quickstart: Phase II Web Todo App

## Prerequisites

- **Node.js**: 20+
- **Python**: 3.13+
- **UV**: Python package manager
- **PostgreSQL**: Local or Neon connection string

## Setup

1. **Clone & Install**
   ```bash
   # Install Frontend
   cd frontend
   npm install

   # Install Backend
   cd ../backend
   uv venv
   source .venv/bin/activate
   uv pip install -r requirements.txt
   ```

2. **Environment Variables**
   Create `.env` in `backend/` and `.env.local` in `frontend/`.

   **Backend `.env`**:
   ```env
   DATABASE_URL="postgresql://user:pass@host/db"
   BETTER_AUTH_SECRET="your_secret_key"
   PORT=8000
   ```

   **Frontend `.env.local`**:
   ```env
   NEXT_PUBLIC_API_URL="http://localhost:8000"
   ```

3. **Database Migration**
   ```bash
   cd backend
   alembic upgrade head
   ```

## Running Locally

1. **Start Backend**
   ```bash
   cd backend
   uvicorn src.main:app --reload
   # Running on http://localhost:8000
   # Docs at http://localhost:8000/docs
   ```

2. **Start Frontend**
   ```bash
   cd frontend
   npm run dev
   # Running on http://localhost:3000
   ```

## Running Tests

- **Backend**: `pytest`
- **Frontend**: `npm test`
