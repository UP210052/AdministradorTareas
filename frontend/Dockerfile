FROM node:lts as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
# Copy built assets from build-stage
COPY --from=build-stage /app/build /usr/share/nginx/html