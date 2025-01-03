FROM node:lts AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:lts AS runtime
WORKDIR /app

# Install PostgreSQL client utilities
RUN apt-get update && apt-get install -y postgresql-client

COPY --from=builder /app ./
COPY entrypoint.sh /app/entrypoint.sh
COPY drizzle.config.ts /app/drizzle.config.ts
RUN chmod +x /app/entrypoint.sh
RUN npm ci --only=production

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["node", "./dist/server/entry.mjs"]