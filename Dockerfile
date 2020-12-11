FROM node:15.4.0-alpine3.10

WORKDIR /app
COPY ./server/package*.json /app/
RUN  npm ci 

COPY ./client/build /app/build
COPY ./server/js /app/js

ENV BUILD_DIR /app/build/
CMD [ "node","js/server.js" ]