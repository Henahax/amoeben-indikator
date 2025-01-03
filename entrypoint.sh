#!/bin/sh

# Debugging: Print the current directory and list files
echo "Current directory: $(pwd)"
ls -l

# Debugging: Print the content of the entrypoint script
echo "Content of entrypoint.sh:"
cat /app/entrypoint.sh

# Wait for PostgreSQL to be ready
until pg_isready -h db -p 5432 -U postgres; do
  echo "Waiting for PostgreSQL to be ready..."
  sleep 5
done

# Run migrations
npx drizzle-kit generate
npx drizzle-kit migrate

# Start the application
exec "$@"
