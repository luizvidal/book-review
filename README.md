# Book Review Application

A full-stack application for book reviews built with NestJS, Next.js, and PostgreSQL.

## Docker Setup

This project is fully dockerized, allowing you to run both the frontend and backend with a single command.

> **Note:** The first build might take some time as it needs to download all dependencies and build the application.

### Prerequisites

- Docker and Docker Compose installed on your machine
- Git (to clone the repository)

### Running the Application

#### Production Mode

To run the application in production mode:

```bash
docker-compose up -d
```

This will:
- Start PostgreSQL database on port 5433
- Build and start the NestJS backend on port 3001
- Build and start the Next.js frontend on port 3000

#### Development Mode

For development with hot-reloading:

```bash
docker-compose -f docker-compose.dev.yml up -d
```

This will mount your local directories into the containers, enabling hot-reloading for both frontend and backend.

### Accessing the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Swagger Documentation: http://localhost:3001/api

### Stopping the Application

```bash
docker-compose down
```

Or for development mode:

```bash
docker-compose -f docker-compose.dev.yml down
```

### Troubleshooting

If you encounter any issues with the Docker setup, try the following:

1. **Rebuild the containers**:
   ```bash
   docker-compose build --no-cache
   ```
   or for development mode:
   ```bash
   docker-compose -f docker-compose.dev.yml build --no-cache
   ```

2. **Check the logs**:
   ```bash
   docker-compose logs -f
   ```
   or for a specific service:
   ```bash
   docker-compose logs -f frontend
   ```

3. **Restart a specific service**:
   ```bash
   docker-compose restart frontend
   ```

4. **Force recreation of containers**:
   ```bash
   docker-compose up -d --force-recreate
   ```

## Manual Setup (Without Docker)

### Backend

```bash
cd backend
npm install
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Database

The PostgreSQL database runs on port 5433 (to avoid conflicts with any local PostgreSQL installation).

Connection details:
- Host: localhost
- Port: 5433
- Username: postgres
- Password: postgres
- Database: book_review
