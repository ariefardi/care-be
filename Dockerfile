# Use Node.js as the base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the entire project
COPY . .

# Expose port 3000
EXPOSE 3000

# Run migrations & start the app
CMD ["sh", "-c", "npx knex migrate:latest && npm run dev"]
