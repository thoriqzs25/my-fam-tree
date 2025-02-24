# Use official Node.js image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Use official Node.js image for production
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Copy built files from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./

# Install production dependencies
RUN npm install --omit=dev

# Expose application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
