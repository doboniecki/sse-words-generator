# SSE Words Generator

A full-stack demonstration of Server-Sent Events (SSE) streaming in a pnpm monorepo. The application generates random words on the backend and streams them in real-time to a React frontend, with configurable word count and delivery frequency.

## Project Structure

```
sse-words-generator/
├── apps/
│   ├── server/          # Fastify backend with SSE endpoint
│   └── client/          # React frontend with streaming UI
├── nginx/               # Reverse proxy configuration
├── Dockerfile           # Multi-stage build for both apps
├── docker-compose.yml   # Container orchestration
└── pnpm-workspace.yaml  # Monorepo configuration
```

### Apps

**server** (`apps/server`)

Fastify API that exposes a single `POST /v1/words` endpoint. On request, it streams JSON-encoded word events at a configurable interval until the requested count is reached or the client disconnects.

Stack: Node.js 24, Fastify 5, TypeScript, `@fastify/sse`, `chance`, Zod, Vitest.

**client** (`apps/client`)

React single-page application with a form to submit stream parameters and a live display of incoming words. Uses Axios with the Fetch adapter and `ReadableStream` to consume the event stream, with an abort control to cancel mid-stream.

Stack: React 19, Vite 7, TypeScript, TailwindCSS 4, Axios.

### Infrastructure

Nginx acts as the single entry point in Docker. It serves the compiled frontend static files and reverse-proxies requests under `/api/` to the backend service.

## Prerequisites

- Node.js 24+
- pnpm 10+
- Docker and Docker Compose (for containerized setup)

## Local Development

Install dependencies from the repo root:

```bash
pnpm install
```

Start the backend (port 4000):

```bash
cd apps/server
pnpm start
```

Start the frontend dev server (port 3001) in a separate terminal:

```bash
cd apps/client
pnpm dev
```

The client `.env` defaults to `VITE_SSE_API_BASE_URL=http://localhost:8080/api`. For local development without Docker, point it directly at the backend:

```
# apps/client/.env
VITE_SSE_API_BASE_URL=http://localhost:4000
```

## Running with Docker

Build and start all services:

```bash
docker-compose up --build
```

| Service   | URL                          |
|-----------|------------------------------|
| Frontend  | http://localhost:8080        |
| API       | http://localhost:8080/api/   |
| Backend   | http://localhost:4000 (direct) |

Stop and clean up:

```bash
docker-compose down
```

## Environment Variables

**Backend** (`apps/server/.env`)

| Variable    | Default | Description                                   |
|-------------|---------|-----------------------------------------------|
| `APP_PORT`  | `4000`  | Port the server listens on (minimum 1000)     |
| `LOG_LEVEL` | `error` | Fastify log level: `error`, `warn`, `debug`, `trace` |

**Frontend** (`apps/client/.env`)

| Variable                 | Default                          | Description              |
|--------------------------|----------------------------------|--------------------------|
| `VITE_SSE_API_BASE_URL`  | `http://localhost:8080/api`      | Base URL for API requests |

## API Reference

### POST /v1/words

Streams randomly generated words as a sequence of JSON events.

**Request body:**

```json
{
  "wordsCount": "10",
  "milliseconds": "500"
}
```

| Field          | Type   | Description                              |
|----------------|--------|------------------------------------------|
| `wordsCount`   | string | Total number of words to stream (> 0)    |
| `milliseconds` | string | Delay between each word in ms (> 0)      |

**Response:** `text/event-stream` — one JSON object per event, e.g.:

```
{"word":"example"}
```

Returns `400` if either field is missing or not a positive number.

## Available Scripts

Run from the repo root:

```bash
# Build all apps
pnpm run -r build

# Build a specific app
pnpm run --filter=server build
pnpm run --filter=client build

# Lint
pnpm run --filter=server lint
pnpm run --filter=client lint

# Run server tests
pnpm run --filter=server test
```
