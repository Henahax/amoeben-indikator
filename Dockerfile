FROM node:latest

# Install PostgreSQL client tools
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY docker-build/ .
COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh
RUN npm ci

ENTRYPOINT ["/entrypoint.sh"]
CMD ["node", "build"]