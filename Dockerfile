FROM node:24-bookworm-slim AS build

WORKDIR /app

RUN apt-get update \
	&& apt-get install -y --no-install-recommends python3 build-essential \
	&& rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci && npm cache clean --force

COPY src ./src
COPY static ./static
COPY vite.config.ts tsconfig.json drizzle.config.ts ./
COPY entrypoint.sh /entrypoint.sh
RUN mkdir -p /app/data && chmod +x /entrypoint.sh

RUN npm run build && rm -rf static .svelte-kit && npm prune --omit=dev --ignore-scripts

FROM node:24-bookworm-slim AS runtime

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/src ./src
COPY --from=build /app/build ./build
COPY --from=build /app/drizzle.config.ts ./drizzle.config.ts
COPY --from=build /entrypoint.sh /entrypoint.sh

RUN mkdir -p /app/data && chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["node", "build"]
