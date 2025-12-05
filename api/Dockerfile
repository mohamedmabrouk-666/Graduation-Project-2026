# Use Node.js base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json files first (caching layers)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy API source code
COPY . .

# Expose API port
EXPOSE 5000

# Start the API server
CMD ["node", "server.js"]
