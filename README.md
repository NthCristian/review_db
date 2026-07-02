# ReviewDB

A modern, full-stack web application for discovering, managing, and reviewing titles — whether they're movies, books, games, or any other media worth cataloging.

---

## Tech Stack

| Layer    | Technology                                                                                                                  |
| -------- | --------------------------------------------------------------------------------------------------------------------------- |
| **API**  | [Elysia](https://elysiajs.com/) · [Bun](https://bun.sh/) · [Prisma](https://www.prisma.io/) · PostgreSQL                    |
| **Web**  | [Next.js 15](https://nextjs.org/) · [React 19](https://react.dev/) · [TailwindCSS 4](https://tailwindcss.com/) · TypeScript |
| **Auth** | JWT (JSON Web Tokens) · Bearer authentication · `Bun.password` hashing                                                      |
| **UI**   | [SweetAlert2](https://sweetalert2.github.io/) · Montserrat font                                                             |

---

## Features

- **User Authentication** — Sign up, sign in, and protected sessions via JWT + Bearer tokens.
- **Title Management** — Create, read, update, and delete titles with a clean REST API.
- **Authorization** — Users can only modify or delete the titles they own.
- **Search & Filter** — Find titles by keyword and filter by the creator.
- **Responsive UI** — Built with TailwindCSS and modern Next.js App Router.
- **Type-Safe API** — End-to-end type safety with Elysia's built-in validation and Prisma's generated client.

---

## Project Structure

```
review_db/
├── api/                        # Backend — Elysia + Bun
│   ├── prisma/
│   │   └── schema.prisma       # Database schema (User & Title models)
│   └── src/
│       ├── index.ts            # App entry point (port 8080)
│       ├── auth/
│       │   ├── controller.ts   # sign-up & sign-in endpoints
│       │   └── guard.ts        # JWT + Bearer auth guard
│       ├── title/
│       │   ├── controller.ts   # CRUD endpoints for titles
│       │   └── index.ts
│       └── service/
│           └── prisma/         # Prisma client singleton
│
├── www/                        # Frontend — Next.js 15
│   └── src/
│       ├── app/
│       │   ├── layout.tsx      # Root layout (Montserrat, Header)
│       │   ├── page.tsx        # Home — public title gallery
│       │   ├── auth/
│       │   │   └── sign-in/    # Sign-in page
│       │   ├── dashboard/      # Authenticated user dashboard
│       │   ├── titles/
│       │   │   └── [id]/       # Single title detail page
│       │   └── users/
│       │       └── [id]/       # User profile / titles by user
│       ├── components/
│       │   └── titleGallery.tsx # Reusable title card grid
│       └── types/
│           └── models.d.ts     # Shared TypeScript interfaces
```

---

## Prerequisites

- **Bun** ≥ 1.x — [Install Bun](https://bun.sh/docs/installation)
- **Node.js** ≥ 20.x — [Install Node.js](https://nodejs.org/)
- **PostgreSQL** — A running PostgreSQL instance (local or remote)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/NthCristian/review_db.git
cd review_db
```

### 2. Set up the API

```bash
cd api

# Install dependencies
bun install

# Configure your database connection
# Create a .env file with your DATABASE_URL
echo "DATABASE_URL=postgresql://user:password@localhost:5432/reviewdb" > .env

# Run database migrations
bunx prisma migrate dev --name init

# Start the development server
bun run dev
```

The API server will start on **http://localhost:8080**.

### 3. Set up the frontend

```bash
cd www

# Install dependencies
npm install

# Start the Next.js dev server (with Turbopack)
npm run dev
```

The frontend will be available at **http://localhost:3000**.

---

## API Endpoints

### Authentication

| Method | Endpoint        | Auth   | Description             |
| ------ | --------------- | ------ | ----------------------- |
| `PUT`  | `/auth/sign-up` | Public | Create a new account    |
| `POST` | `/auth/sign-in` | Public | Sign in — returns a JWT |

**Sign-Up Body:**

```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword"
}
```

**Sign-In Body:**

```json
{
    "email": "john@example.com",
    "password": "securepassword"
}
```

### Titles

| Method   | Endpoint      | Auth         | Description                                 |
| -------- | ------------- | ------------ | ------------------------------------------- |
| `GET`    | `/titles`     | Public       | List all titles (supports `?search=&user=`) |
| `GET`    | `/titles/:id` | Public       | Get a single title by ID                    |
| `PUT`    | `/titles`     | Bearer JWT   | Create a new title                          |
| `PATCH`  | `/titles/:id` | Bearer JWT\* | Update a title (owner only)                 |
| `DELETE` | `/titles/:id` | Bearer JWT\* | Delete a title (owner only)                 |

> \*Owner-only: The authenticated user must be the `created_by` user of the title.

**Create/Update Title Body:**

```json
{
    "title": "Inception",
    "overview": "A thief who steals corporate secrets through dream-sharing technology."
}
```

### Authorization

All protected endpoints expect the JWT in the `Authorization` header as a Bearer token:

```
Authorization: Bearer <your-jwt-token>
```

---

## Database Schema

The application uses two main models connected by a relational database:

| Model   | Fields                                                            |
| ------- | ----------------------------------------------------------------- |
| `user`  | `id`, `name`, `email` (unique), `password`, `created_at`          |
| `title` | `id`, `title`, `overview`, `created_by` (FK → user), `created_at` |

---

## Environment Variables

### API (`api/.env`)

| Variable       | Description                  | Example                                              |
| -------------- | ---------------------------- | ---------------------------------------------------- |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:password@localhost:5432/reviewdb` |

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---

<p align="center">
  <sub>Built with ❤️ using Bun, Elysia, Next.js, and PostgreSQL</sub>
</p>
