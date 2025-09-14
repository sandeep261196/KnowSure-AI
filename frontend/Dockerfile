# Stage 1: Build the React app
FROM --platform=linux/amd64 node:18 as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve with Nginx
FROM --platform=linux/amd64 nginx:alpine

# Copy custom Nginx config if you have one
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
