FROM node:15.5.1-alpine3.10 as build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM alpine:3.14.2
COPY --from=build /app /var/www/html
