#!/bin/bash

# Function to display help message
show_help() {
  echo "Book Review Application Docker Helper"
  echo ""
  echo "Usage: ./docker.sh [command]"
  echo ""
  echo "Commands:"
  echo "  start       Start the application in production mode"
  echo "  start:dev   Start the application in development mode"
  echo "  stop        Stop the application"
  echo "  stop:dev    Stop the development application"
  echo "  restart     Restart the application"
  echo "  restart:dev Restart the development application"
  echo "  logs        Show logs"
  echo "  logs:dev    Show development logs"
  echo "  build       Rebuild containers"
  echo "  build:dev   Rebuild development containers"
  echo "  clean       Remove all containers, networks, and volumes"
  echo "  help        Show this help message"
  echo ""
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
  echo "Docker is not installed. Please install Docker first."
  exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
  echo "Docker Compose is not installed. Please install Docker Compose first."
  exit 1
fi

# Process commands
case "$1" in
  start)
    echo "Starting the application in production mode..."
    docker-compose up -d
    echo "Application started. Frontend: http://localhost:3000, Backend: http://localhost:3001"
    ;;
  start:dev)
    echo "Starting the application in development mode..."
    docker-compose -f docker-compose.dev.yml up -d
    echo "Development application started. Frontend: http://localhost:3000, Backend: http://localhost:3001"
    ;;
  stop)
    echo "Stopping the application..."
    docker-compose down
    echo "Application stopped."
    ;;
  stop:dev)
    echo "Stopping the development application..."
    docker-compose -f docker-compose.dev.yml down
    echo "Development application stopped."
    ;;
  restart)
    echo "Restarting the application..."
    docker-compose down
    docker-compose up -d
    echo "Application restarted. Frontend: http://localhost:3000, Backend: http://localhost:3001"
    ;;
  restart:dev)
    echo "Restarting the development application..."
    docker-compose -f docker-compose.dev.yml down
    docker-compose -f docker-compose.dev.yml up -d
    echo "Development application restarted. Frontend: http://localhost:3000, Backend: http://localhost:3001"
    ;;
  logs)
    echo "Showing logs..."
    docker-compose logs -f
    ;;
  logs:dev)
    echo "Showing development logs..."
    docker-compose -f docker-compose.dev.yml logs -f
    ;;
  build)
    echo "Rebuilding containers..."
    docker-compose build
    echo "Containers rebuilt."
    ;;
  build:dev)
    echo "Rebuilding development containers..."
    docker-compose -f docker-compose.dev.yml build
    echo "Development containers rebuilt."
    ;;
  clean)
    echo "Removing all containers, networks, and volumes..."
    docker-compose down -v
    docker-compose -f docker-compose.dev.yml down -v
    echo "Cleanup complete."
    ;;
  help|*)
    show_help
    ;;
esac
