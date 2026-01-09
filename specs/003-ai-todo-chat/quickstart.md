# Quickstart: Phase III AI Chatbot

## Prerequisites

- **Gemini API Key**: Get from Google AI Studio. Set `GEMINI_API_KEY` in `.env`.
- **Phase II**: Functional Auth and DB.

## Setup

1. **Environment Variables**
   Add to `backend/.env`:
   ```env
   GEMINI_API_KEY="AIzaSy..."
   ```

2. **Database Migration**
   ```bash
   cd backend
   alembic revision --autogenerate -m "Add chat tables"
   alembic upgrade head
   ```

3. **Install Dependencies**
   ```bash
   cd backend
   uv pip install google-generativeai
   ```

## Usage

1. **Start Backend**
   ```bash
   cd backend
   uvicorn src.main:app --reload
   ```

2. **Test Chat**
   - Use Swagger UI at `http://localhost:8000/docs`.
   - POST `/chat/message` with `{"content": "Add task buy milk"}`.
   - Verify task is created in GET `/tasks`.
