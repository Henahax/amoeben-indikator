FROM node:18 AS runtime
WORKDIR /app

# Install build dependencies for native modules
RUN apt-get update && apt-get install -y \
  python3 \
  make \
  g++ \
  && rm -rf /var/lib/apt/lists/*

COPY . .

RUN npm install
RUN npm run build

# Create directory for SQLite database
RUN mkdir -p /app/data

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD node ./dist/server/entry.mjs