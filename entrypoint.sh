#!/bin/sh
set -eu

DATABASE_URL="${DATABASE_URL:-./data/amoeben-indikator.db}"
export DATABASE_URL
mkdir -p "$(dirname "$DATABASE_URL")"
npx drizzle-kit push --config=drizzle.config.ts --force
npm run db:seed
exec "$@"
