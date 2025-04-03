#!/bin/bash
set -e

# Wait for the database to be ready
echo "Waiting for database..."
until pg_isready -h db -U root -d amoeben-indikator; do
  sleep 2
done

echo "Database is ready. Running migrations and seeding..."
npm run db:push
npm run db:seed

echo "Starting the application..."
exec "$@"