# CLAUDE.md

## Project Overview

This project is a fullstack web application using:

- Frontend: Next.js (App Router, TypeScript)
- Backend API: Express.js
- Database: PostgreSQL
- Authentication: Firebase Authentication
- ORM: Prisma
- Runtime: Node.js

Architecture style:

- Frontend handles UI/UX and client state.
- Express.js acts as REST API server.
- PostgreSQL is the source of truth for application data.
- Firebase Authentication handles authentication only.
- Backend verifies Firebase ID Token before accessing protected resources.

---

# Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios / Fetch API
- React Query (preferred)

## Backend

- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- Firebase Admin SDK
- JWT verification through Firebase

## Database

- PostgreSQL
- Prisma schema migrations

## Authentication

- Firebase Authentication Providers:
  - Email/Password
  - Google Sign In

---

# Architecture Rules

## Authentication Flow

Firebase Authentication is ONLY responsible for:

- Login
- Register
- Identity verification
- ID token generation

PostgreSQL is responsible for:

- User profile data
- Roles
- Permissions
- Application business data

DO NOT store business logic inside Firebase.