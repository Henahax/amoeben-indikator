FROM node:22-bookworm-slim

# Install PostgreSQL client tools
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm ci && npm cache clean --force

COPY src ./src
COPY static ./static
COPY svelte.config.js vite.config.ts tsconfig.json drizzle.config.ts ./
COPY entrypoint.sh /entrypoint.sh

RUN npm run build && rm -rf static .svelte-kit

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["node", "build"]