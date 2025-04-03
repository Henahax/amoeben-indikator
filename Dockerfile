FROM node:latest

WORKDIR /app
COPY docker-build/ .

RUN npm ci --production

CMD ["node","build/index.js"]