FROM node:latest

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN mkdir -p /data && \
    chown -R node:node /data && \
    chown -R node:node /app

USER node

RUN npm run build

EXPOSE 5173

CMD ["node", "build"]