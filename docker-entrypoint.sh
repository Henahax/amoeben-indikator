#!/bin/bash
set -e

# Wait for postgres to be ready
echo "Waiting for postgres..."
until nc -z db 5432; do
  sleep 1
done
echo "PostgreSQL started"

# Run database migrations and seed
echo "Running database migrations..."
npm run db:push
echo "Seeding database..."
npm run db:seed

# Start the application
echo "Starting application..."
exec node build/index.js
