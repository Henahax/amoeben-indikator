FROM node:latest

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build
RUN rm -rf src/ static/ docker-compose.yml docker-compose-dev.yml

USER node:node

CMD ["node","build/index.js"]