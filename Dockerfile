FROM node:lts AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build
RUN npx drizzle-kit generate
RUN npx drizzle-kit migrate

FROM node:lts AS runtime
WORKDIR /app

COPY --from=builder /app ./
RUN npm ci --only=production

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs"]