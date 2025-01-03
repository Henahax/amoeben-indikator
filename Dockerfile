FROM node:lts AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:lts AS runtime
WORKDIR /app

COPY --from=builder /app ./
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh
RUN npm ci --only=production

# Verify the entrypoint script exists
RUN ls -l /app/entrypoint.sh

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["node", "./dist/server/entry.mjs"]