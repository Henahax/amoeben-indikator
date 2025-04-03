#!/bin/bash
set -e

# Wait for the database to be ready
echo "Waiting for database..."
until pg_isready -h db -U root -d amoeben-indikator; do
  sleep 2
done

# Run database migrations and seed
echo "Running database migrations..."
npx drizzle-kit push --config=drizzle.config.ts --force
echo "Seeding database..."
npm run db:seed

# Start the application
echo "Starting application..."
exec node build/index.js
