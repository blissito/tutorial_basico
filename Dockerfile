FROM oven/bun:1-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Copy bun.lockb if it exists (optional)
COPY bun.lockb* ./

# Install dependencies (will create bun.lockb if it doesn't exist)
RUN bun install

# Copy static files
COPY . .

# Expose port
EXPOSE 8080

# Start Bun server
CMD ["bun", "run", "start"] 