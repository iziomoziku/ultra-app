# Step 1: Build the frontend
FROM node:20 AS build-frontend
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Step 2: Serve the frontend using Nginx
FROM nginx:alpine AS runtime-frontend
COPY --from=build-frontend /app/dist /usr/share/nginx/html
EXPOSE 80
