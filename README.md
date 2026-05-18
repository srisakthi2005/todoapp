# To-Do List Application

This repository contains a React frontend and an Express backend for a todo list application.

## Structure

- `backend/` - Express API and MongoDB persistence
- `frontend/` - React client app built with Vite
- `specs/001-todo-list-app/` - feature documentation, plan, tasks, and contracts

## Local Setup

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Notes

- Backend listens on `http://localhost:4000`
- Frontend uses Vite dev server on `http://localhost:5173`
- `backend/.env.example` shows required environment variables
