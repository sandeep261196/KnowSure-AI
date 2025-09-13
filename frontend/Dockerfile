# ------------------------
# Build stage
# ------------------------
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Build frontend (Vite)
RUN npm run build

# ------------------------
# Serve stage
# ------------------------
FROM nginx:alpine

# Copy custom nginx.conf (important: overrides default)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output to nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose frontend port
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
