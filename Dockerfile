FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN mkdir -p /data && \
    chown -R node:node /data && \
    chown -R node:node /app

USER node

RUN npm run build

EXPOSE 3000

CMD ["node", "build"]