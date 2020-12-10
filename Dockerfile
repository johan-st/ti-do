FROM node:15.4.0-alpine3.10
# FROM node:15.4.0

WORKDIR /app
ENV BUILD_DIR /app/build
COPY ./server/package*.json /app/
RUN  npm ci 
# RUN  npm ci --only=production

COPY ./client/build /app/build
COPY ./server/js /app/js

CMD [ "node","js/server.js" ]