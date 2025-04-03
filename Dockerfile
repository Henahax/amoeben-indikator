FROM node:latest

WORKDIR /app
COPY docker-build/ .
COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh
RUN npm ci --production

ENTRYPOINT ["/entrypoint.sh"]
CMD ["node", "build"]