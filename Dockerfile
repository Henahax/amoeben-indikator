FROM node:latest

# Install netcat for database connection checking
RUN apt-get update && apt-get install -y netcat-traditional && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

# Keep necessary files for database operations
RUN rm -rf src/ static/

# Make entrypoint executable
COPY docker-entrypoint.sh .
RUN chmod +x docker-entrypoint.sh

USER node:node
ENTRYPOINT ["./docker-entrypoint.sh"]
