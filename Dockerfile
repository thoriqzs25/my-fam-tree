# Use official Node.js image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for better caching)
COPY package.json package-lock.json ./

# Install dependencies and cache them
RUN npm ci --only=production

# Copy only necessary files (avoiding unnecessary invalidation of cache)
COPY . .

# Build the application
RUN npm run build

# Use a lightweight production image
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Copy only necessary built files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Expose application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
