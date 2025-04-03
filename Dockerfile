# Stage 1: Build
FROM node:latest AS builder

WORKDIR /app
COPY docker-build/ . 

RUN npm ci
RUN npm run build

# Stage 2: Run
FROM node:latest

WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

CMD ["node", "build"]