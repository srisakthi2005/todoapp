# API Contract: To-Do List Application

## Authentication Endpoints

### POST /api/signup

Request body:

```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

Response (201 Created):

```json
{
  "userId": "648abc123def456789012345",
  "username": "johndoe",
  "email": "john@example.com"
}
```

Error responses:

- `400 Bad Request` for missing fields or invalid email
- `409 Conflict` for already-registered email

### POST /api/login

Request body:

```json
{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

Response (200 OK):

```json
{
  "token": "<jwt-token>",
  "userId": "648abc123def456789012345"
}
```

Error responses:

- `400 Bad Request` for missing fields
- `401 Unauthorized` for invalid credentials

## Task Management Endpoints

### GET /api/tasks

Headers:

```http
Authorization: Bearer <jwt-token>
```

Query params:

- `date` (optional): `YYYY-MM-DD` to filter today's tasks or a specific date

Response (200 OK):

```json
[
  {
    "taskId": "648def123abc456789012345",
    "name": "Finish project proposal",
    "description": "Draft and submit the initial todo app design.",
    "status": "pending",
    "createdAt": "2026-05-16T12:10:00.000Z"
  }
]
```

Error responses:

- `401 Unauthorized` when token is missing or invalid

### POST /api/tasks

Headers:

```http
Authorization: Bearer <jwt-token>
```

Request body:

```json
{
  "name": "Write unit tests",
  "description": "Add coverage for task creation and deletion"
}
```

Response (201 Created):

```json
{
  "taskId": "648fed123abc456789012345",
  "name": "Write unit tests",
  "description": "Add coverage for task creation and deletion",
  "status": "pending",
  "createdAt": "2026-05-16T12:20:00.000Z"
}
```

Error responses:

- `400 Bad Request` when `name` is missing or invalid
- `401 Unauthorized` when token is missing or invalid

### PATCH /api/tasks/:id/status

Headers:

```http
Authorization: Bearer <jwt-token>
```

Request body:

```json
{
  "status": "completed"
}
```

Response (200 OK):

```json
{
  "taskId": "648fed123abc456789012345",
  "name": "Write unit tests",
  "description": "Add coverage for task creation and deletion",
  "status": "completed",
  "updatedAt": "2026-05-16T12:25:00.000Z"
}
```

Error responses:

- `400 Bad Request` for invalid status
- `401 Unauthorized` when token is missing or invalid
- `404 Not Found` when the task does not exist or does not belong to the user

### DELETE /api/tasks/:id

Headers:

```http
Authorization: Bearer <jwt-token>
```

Response (204 No Content)

Error responses:

- `401 Unauthorized` when token is missing or invalid
- `404 Not Found` when the task does not exist or does not belong to the user

## Daily Summary Endpoint

### GET /api/tasks/summary

Headers:

```http
Authorization: Bearer <jwt-token>
```

Query params:

- `date` (optional): `YYYY-MM-DD`, defaults to today's date

Response (200 OK):

```json
{
  "date": "2026-05-16",
  "total": 5,
  "completed": 3,
  "pending": 2
}
```

Error responses:

- `401 Unauthorized` when token is missing or invalid

## Authentication

- All task endpoints require `Authorization: Bearer <jwt-token>`.
- Users can only access and modify tasks belonging to their own account.
- Passwords are never returned by the API.
