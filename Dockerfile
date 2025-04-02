FROM node:latest

WORKDIR /app

ENV DATABASE_URL=postgresql://root:Holz1337@localhost:5432/amoeben-indikator

COPY . .

RUN npm ci
RUN npm run build
RUN rm -rf src/ static/ docker-compose.yml docker-compose-dev.yml

EXPOSE 3000
CMD ["node", "build"]