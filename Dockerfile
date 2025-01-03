FROM node:lts AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:lts AS runtime
WORKDIR /app

COPY --from=builder /app ./
COPY entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh
RUN npm ci --only=production

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
ENTRYPOINT ["entrypoint.sh"]
CMD ["node", "./dist/server/entry.mjs"]