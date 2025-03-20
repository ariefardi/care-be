# Use Node.js as the base image
FROM node:20

# Set working directory
WORKDIR /app


# Remove old node_modules
RUN rm -rf node_modules yarn.lock

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN yarn

# Copy the entire project
COPY . .




# Expose port 3000
EXPOSE 3000

# Run migrations & start the app
CMD ["sh", "-c", "npm run init"]
