# Quickstart: To-Do List Application

## Prerequisites

- Node.js 20+ and npm
- MongoDB instance accessible via connection string
- Optional: Git for source control

## Local Setup

1. Clone or open the repository in the workspace.
2. Create a `.env` file for the backend with:

```env
MONGO_URI=mongodb://localhost:27017/todoapp
JWT_SECRET=replace-with-a-strong-secret
PORT=4000
```

3. Install backend dependencies:

```bash
cd backend
npm install
```

4. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

## Run the Application

1. Start MongoDB locally or connect to your MongoDB Atlas cluster.
2. Start the backend API:

```bash
cd backend
npm run dev
```

3. Start the frontend app:

```bash
cd frontend
npm run dev
```

4. Open the browser to `http://localhost:3000`.

## Test the Feature

- Sign up with a new account.
- Log in with the registered email and password.
- Add a new task.
- Mark the task complete or incomplete.
- Delete the task.
- Request the daily summary and verify counts.
