FROM node:22-bookworm-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci && npm cache clean --force

COPY src ./src
COPY static ./static
COPY svelte.config.js vite.config.ts tsconfig.json drizzle.config.ts ./
COPY entrypoint.sh /entrypoint.sh
RUN mkdir -p /app/data && chmod +x /entrypoint.sh

RUN npm run build && rm -rf static .svelte-kit

ENTRYPOINT ["/entrypoint.sh"]
CMD ["node", "build"]
