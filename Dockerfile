FROM node:latest

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build
RUN rm -rf src/ static/ docker-compose.yml docker-compose-dev.yml

EXPOSE 3000
CMD ["node", "build"]