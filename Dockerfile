FROM node:latest

# Install PostgreSQL client tools
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY docker-build/ .
COPY src ./src
COPY drizzle.config.ts ./
COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

# Install all dependencies, including devDependencies
RUN npm ci

ENTRYPOINT ["/entrypoint.sh"]
CMD ["node", "build"]