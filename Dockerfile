FROM node:latest AS builder

WORKDIR /app
COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

RUN npm ci
RUN npm run build

FROM node:latest

WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/package*.json ./
RUN npm ci --production

CMD ["node", "build"]