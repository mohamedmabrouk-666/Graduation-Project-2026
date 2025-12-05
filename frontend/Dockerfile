# # Stage 1: Build React App
# FROM node:20-alpine AS builder

# WORKDIR /app

# # Copy package.json + package-lock.json first for caching
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy all source files
# COPY . .

# # Build React production files
# RUN npm run build

# # Stage 2: Serve with Nginx
# FROM nginx:alpine

# # Copy build from Stage 1
# COPY --from=builder /app/build /usr/share/nginx/html

# # Expose port 80
# EXPOSE 80

# # Start Nginx
# CMD ["nginx", "-g", "daemon off;"]


# =====================================================================================

# Step 1: Build React app
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
