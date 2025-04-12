# Stage 1: Build the Angular app
FROM node:18-alpine AS build

WORKDIR /app

# Copy Angular project files
COPY . .

# Install dependencies
RUN npm install

# Build Angular app with production configuration
RUN npm run build -- --configuration=production

# Stage 2: Serve the Angular app with NGINX
FROM nginx:alpine

# Copy build output to NGINX html directory
COPY --from=build /app/dist/my-movie-planner /usr/share/nginx/html

# Copy custom NGINX config for Angular routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start NGINX in foreground
CMD ["nginx", "-g", "daemon off;"]
