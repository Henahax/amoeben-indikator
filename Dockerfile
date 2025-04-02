FROM node:latest

WORKDIR /app
COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

RUN npm ci
RUN npm run build
RUN rm -rf src/ static/ docker-compose.yml docker-compose-dev.yml

CMD ["node", "build"]