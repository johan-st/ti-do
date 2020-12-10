FROM node:15.4.0-alpine3.10
# FROM node:15.4.0

WORKDIR /app
ENV BUILD_DIR /app/build
COPY ./client/build /app/build
COPY ./server/js /app/js
COPY ./server/package*.json /app/
RUN  npm ci 
# RUN  npm ci --only=production

CMD [ "node","js/server.js" ]