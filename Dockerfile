FROM node:latest

WORKDIR /app
COPY docker-build/ .

RUN npm ci --production

RUN npm run build
RUN rm -rf src/ static/ emailTemplates/ docker-compose.yml

USER node:node

CMD ["node","build/index.js"]