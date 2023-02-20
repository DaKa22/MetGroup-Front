#STEP 1 BUILD VUE PROJECT
FROM node:14.17.6-alpine AS build
WORKDIR /app
COPY ./app/package*.json ./
RUN npm install --silent
COPY ./app /app
RUN npm run build

#STEP 2 CREATE NGINX SERVER
FROM nginx:1.19.0-alpine AS prod-stage
COPY ./docker/production/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./docker/production/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
RUN chown nginx:nginx /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]