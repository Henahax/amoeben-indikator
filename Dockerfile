# Use official Node.js image
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for better caching)
COPY docker-build/package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the app (including source files)
COPY docker-build/ .

# Build the project
RUN npm run build

# Start the app
CMD ["node", "build"]