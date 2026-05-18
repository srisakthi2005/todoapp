# Research: To-Do List Application

## Decision

Choose a MERN-style JavaScript stack with React for the frontend, Express/Node.js for the backend API, and MongoDB for persistence. Authentication will use email/password credentials with secure password hashing and token-based session handling.

## Rationale

- The user explicitly requested React.js, Express.js, Node.js, and MongoDB, so the selected stack matches stakeholder expectations.
- React provides a responsive UI for task creation, status updates, and daily summaries.
- Express and Node.js offer a lightweight backend for RESTful APIs, which is ideal for the required CRUD operations and authentication flows.
- MongoDB is a natural fit for storing user documents and the user-scoped task documents needed by this app.
- JSON Web Tokens or session tokens are standard for browser + API authentication in this stack.

## Alternatives Considered

- Next.js instead of plain React: rejected in favor of a simpler client-side React app and an explicit API backend for clearer separation of concerns.
- PostgreSQL/MySQL instead of MongoDB: rejected because the user requested MongoDB and the task schema is well-suited for document storage.
- Session cookie-based auth instead of JWT: considered acceptable, but token-based auth is simpler to integrate across React and Express in a planned SPA architecture.

## Key Implementation Choices

- Use a separate frontend and backend project layout to keep UI and API development independent.
- Implement REST endpoints for authentication and task management rather than GraphQL to minimize complexity.
- Store tasks in a collection keyed by user ID and include metadata such as `createdAt`, `updatedAt`, and `status`.
- Provide a daily summary API that computes counts for the selected day on the server.
