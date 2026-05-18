# Tasks: To-Do List Application

**Input**: Design documents from `/specs/001-todo-list-app/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the project shells and install the JavaScript stack dependencies.

- [x] T001 Create `backend/` project structure with `backend/src/`, `backend/src/controllers/`, `backend/src/models/`, `backend/src/routes/`, `backend/src/services/`, and `backend/tests/`
- [x] T002 Create `frontend/` project structure with `frontend/src/components/`, `frontend/src/pages/`, `frontend/src/services/`, and `frontend/tests/`
- [x] T003 Initialize `backend/package.json` and install `express`, `mongoose`, `bcrypt`, `jsonwebtoken`, `dotenv`, and `cors`
- [x] T004 Initialize `frontend/package.json` and install `react`, `react-dom`, `react-router-dom`, and `axios`
- [x] T005 Create `backend/.env.example` and `frontend/.env.example` for local configuration
- [x] T006 Create `README.md` in repository root with quickstart instructions for backend and frontend

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Implement the core backend and frontend infrastructure needed by all stories.

- [x] T007 Implement database connection in `backend/src/app.js` and `backend/src/models/index.js`
- [x] T008 Create `backend/src/models/user.model.js` with user schema fields `username`, `email`, and `passwordHash`
- [x] T009 Create `backend/src/models/task.model.js` with task schema fields `userId`, `name`, `description`, `status`, `createdAt`, and `updatedAt`
- [x] T010 Implement authentication middleware in `backend/src/middleware/auth.middleware.js` to validate `Authorization: Bearer <token>`
- [x] T011 Implement API routing in `backend/src/routes/auth.routes.js` and `backend/src/routes/task.routes.js`
- [x] T012 Implement global error handling in `backend/src/middleware/error.middleware.js`
- [x] T013 Implement request validation helpers in `backend/src/services/validation.service.js`
- [x] T014 Create `frontend/src/services/api.service.js` for base API calls and token injection
- [x] T015 Create `frontend/src/services/auth.service.js` to handle signup, login, and token persistence
- [x] T016 Create `frontend/src/App.jsx` and route configuration for `/signup`, `/login`, `/tasks`, and `/summary`
- [x] T017 Create `frontend/src/pages/ProtectedRoute.jsx` to guard authenticated routes

---

## Phase 3: User Story 1 - Account Creation and Login (Priority: P1) 🎯 MVP

**Goal**: Enable user signup and login so authenticated users can access task data.

**Independent Test**: Signup with a new email and login with the same credentials to receive a valid session token and access protected routes.

- [x] T018 [US1] Implement signup controller in `backend/src/controllers/auth.controller.js` with password hashing and email uniqueness check
- [x] T019 [US1] Implement login controller in `backend/src/controllers/auth.controller.js` with email/password verification and JWT issuance
- [x] T020 [US1] Create `backend/src/routes/auth.routes.js` POST endpoints `/api/signup` and `/api/login`
- [x] T021 [US1] Implement backend response formatting to avoid returning `passwordHash`
- [x] T022 [US1] Create `frontend/src/pages/SignupPage.jsx` with form fields `username`, `email`, and `password`
- [x] T023 [US1] Create `frontend/src/pages/LoginPage.jsx` with form fields `email` and `password`
- [x] T024 [US1] Implement frontend signup flow in `frontend/src/services/auth.service.js` and page submission handling
- [x] T025 [US1] Implement frontend login flow in `frontend/src/services/auth.service.js` and page submission handling
- [x] T026 [US1] Create `frontend/src/pages/LoginSuccess.jsx` or redirect logic after authentication
- [x] T027 [US1] Add error display for signup/login failures in `frontend/src/pages/SignupPage.jsx` and `frontend/src/pages/LoginPage.jsx`

---

## Phase 4: User Story 2 - Create and View Tasks (Priority: P1)

**Goal**: Allow authenticated users to create tasks and view their daily task list.

**Independent Test**: Create a task after login, then fetch the task list for the same user and confirm the new task appears.

- [x] T028 [US2] Implement task creation service in `backend/src/services/task.service.js`
- [x] T029 [US2] Implement `backend/src/controllers/task.controller.js` POST `/api/tasks`
- [x] T030 [US2] Implement `backend/src/controllers/task.controller.js` GET `/api/tasks` with optional `date` query filtering
- [x] T031 [US2] Implement task persistence and owner association in `backend/src/models/task.model.js`
- [x] T032 [US2] Implement `frontend/src/pages/TaskListPage.jsx` to fetch and render the authenticated user's tasks
- [x] T033 [US2] Create `frontend/src/pages/NewTaskPage.jsx` or task creation form in `TaskListPage.jsx`
- [x] T034 [US2] Implement frontend add-task behavior in `frontend/src/services/api.service.js` and `frontend/src/services/task.service.js`
- [x] T035 [US2] Add client-side task creation validation in `frontend/src/pages/NewTaskPage.jsx`
- [x] T036 [US2] Ensure task list results are filtered by the current user and selected date in `frontend/src/pages/TaskListPage.jsx`

---

## Phase 5: User Story 3 - Update Status and Delete Tasks (Priority: P2)

**Goal**: Enable users to mark tasks complete/incomplete and delete tasks.

**Independent Test**: Update a task status and delete a task, then confirm the task list reflects both changes.

- [x] T037 [US3] Implement backend patch endpoint `PATCH /api/tasks/:id/status` in `backend/src/controllers/task.controller.js`
- [x] T038 [US3] Implement backend delete endpoint `DELETE /api/tasks/:id` in `backend/src/controllers/task.controller.js`
- [x] T039 [US3] Add ownership checks in backend task controllers to ensure users can only modify their own tasks
- [x] T040 [US3] Implement frontend mark-complete and mark-incomplete actions in `frontend/src/pages/TaskListPage.jsx`
- [x] T041 [US3] Implement frontend delete task action in `frontend/src/pages/TaskListPage.jsx`
- [x] T042 [US3] Add confirmation and error handling for task deletion in `frontend/src/pages/TaskListPage.jsx`
- [x] T043 [US3] Update backend task service in `backend/src/services/task.service.js` to support status changes and deletion
- [x] T044 [US3] Add task status labels to the task list UI in `frontend/src/pages/TaskListPage.jsx`

---

## Phase 6: User Story 4 - Daily Summary (Priority: P2)

**Goal**: Provide a daily summary showing total, completed, and pending tasks.

**Independent Test**: Create tasks with mixed status values for today, then request the summary and verify counts match.

- [x] T045 [US4] Implement summary endpoint `GET /api/tasks/summary` in `backend/src/controllers/task.controller.js`
- [x] T046 [US4] Add summary calculation logic in `backend/src/services/task.service.js`
- [x] T047 [US4] Create `frontend/src/pages/DailySummaryPage.jsx` to fetch and display the summary
- [x] T048 [US4] Implement frontend summary service call in `frontend/src/services/task.service.js`
- [x] T049 [US4] Add summary UI cards for `total`, `completed`, and `pending` tasks in `frontend/src/pages/DailySummaryPage.jsx`
- [x] T050 [US4] Add optional `date` selector support in `frontend/src/pages/DailySummaryPage.jsx`

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Finalize docs, configuration, and shared quality improvements.

- [x] T051 [P] Add development startup scripts to `backend/package.json` and `frontend/package.json`
- [x] T052 [P] Update `README.md` with backend and frontend run commands and API endpoint summary
- [x] T053 [P] Create end-to-end smoke test notes in `specs/001-todo-list-app/quickstart.md`
- [x] T054 [P] Add environment variable loading and validation in `backend/src/app.js`
- [x] T055 [P] Add `frontend/src/services/auth.service.js` token refresh/expiration handling notes
- [x] T056 [P] Add simple styling and layout in `frontend/src/components/Header.jsx` and `frontend/src/components/Footer.jsx`
- [x] T057 [P] Ensure backend does not return `passwordHash` in any API response
- [x] T058 [P] Verify all protected API endpoints return `401 Unauthorized` when the token is missing or invalid
- [x] T059 [P] Validate all required task fields before backend persistence in `backend/src/services/validation.service.js`
- [x] T060 [P] Verify frontend protected routes redirect to `/login` when no auth token exists

---

## Dependencies & Execution Order

- Phase 1: Setup must complete before Phase 2.
- Phase 2: Foundational must complete before any user story phase.
- Phase 3 (US1) and Phase 4 (US2) are P1 stories and can be implemented in parallel after Foundation.
- Phase 5 (US3) and Phase 6 (US4) are P2 stories and can also proceed after Foundation.
- Phase 7: Polish depends on the completion of all prior user story phases.

## Parallel Opportunities

- [P] tasks in Phase 1 and Phase 7 can be executed concurrently because they use separate files or docs.
- User Stories 1 and 2 can be worked on in parallel after foundation is complete.
- User Stories 3 and 4 can start in parallel after foundation is complete.
- Backend model and route implementation tasks for different stories can be parallelized when they touch separate files.

## Summary

- Total tasks: 60
- User Story 1 tasks: 10
- User Story 2 tasks: 9
- User Story 3 tasks: 8
- User Story 4 tasks: 6
- Shared setup/foundation tasks: 17
- Polish tasks: 10
