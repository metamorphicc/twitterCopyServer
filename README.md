# Twitter Copy Server

Twitter Copy Server is the backend API for the Twitter Copy learning project. It provides the Express/MySQL layer used by the Next.js frontend for profile registration, profile data, and post storage.

The project is an educational work in progress. It is intentionally small and direct, which makes it easy to inspect how routes, database queries, and frontend integration are wired together.

## Overview

The server exposes a local REST API on port `8089` and is configured for a frontend running on:

```text
http://localhost:3000
```

It uses a MySQL connection pool and separates API features into route modules under `src/api`.

## Tech Stack

- **Runtime:** Node.js
- **Server:** Express 5
- **Database:** MySQL
- **Database client:** mysql2/promise
- **Configuration:** dotenv
- **Local development:** nodemon
- **HTTP helpers:** cors, axios
- **Module format:** ES modules

## Features

- Express API server with JSON request parsing
- CORS configuration for the local Next.js frontend
- MySQL connection pool
- Profile registration endpoint
- Profile lookup endpoint
- Post creation endpoint
- Post listing endpoint
- User-specific post lookup endpoint
- Early Google OAuth redirect helper

## Project Structure

```text
main.js                         Express app entry point
src/
  db.js                         MySQL pool configuration
  api/
    regProfile/route.js         Profile registration
    profiles/route.js           Profile data lookup
    posts/route.js              Create and list posts
    getPosts/router.js          Get posts for a specific profile
    profileId/route.js          Experimental session-based profile lookup
    auth/google/route.js        Google OAuth redirect helper
```

## API Routes

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/` | Health/info response for the API |
| `GET` | `/api/posts` | Returns all posts |
| `POST` | `/api/posts` | Creates a post from `text` and profile `id` |
| `POST` | `/api/getPosts` | Returns posts by profile id |
| `POST` | `/api/profiles` | Returns profile metadata by id |
| `POST` | `/api/regProfile` | Registers a profile if the email is not already used |

There is also an experimental `profileId` route and a Google OAuth redirect helper in the source tree. These are part of the current development direction and can be finished or mounted as the auth flow becomes more stable.

## Request Examples

Create a profile:

```json
{
  "usernameForm": "Alex",
  "emailForm": "alex@example.com",
  "tag": "alexdev",
  "day": "1",
  "month": "June",
  "year": "2007"
}
```

Create a post:

```json
{
  "text": "Hello from Twitter Copy",
  "id": 1
}
```

Get posts for one profile:

```json
{
  "ids": 1
}
```

## Database

The code expects a MySQL database with profile and post data. During development, the important fields used by the routes are:

```text
profiles:
  id
  username
  emails
  tag
  createdAt
  following
  followers
  path_to_pfp
  googleid
  profile_description

posts:
  id
  content
  profile_id
  created_at
```

The schema can be refined further as the project matures.

## Getting Started

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
DB_HOST=127.0.0.1
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
PORT=3306
```

Start the development server:

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:8089
```

## Available Scripts

```bash
npm run dev      # Start the API with nodemon
npm test         # Placeholder test script
```

## Current Status

This backend is a student MVP and companion API for the frontend. The basic route structure and database queries are in place, while validation, error responses, schema migrations, and auth/session cleanup are still planned work.

### Implemented

- Local Express server
- MySQL connection pool
- Profile registration with duplicate email check
- Profile metadata lookup
- Post creation and listing routes
- CORS setup for the frontend

### In Progress

- Consistent error handling
- Request validation
- Complete auth/session integration
- Database migrations
- Tests
- Production-ready configuration

## Related Repository

The frontend application is developed separately in `Twitter-Copy`.
