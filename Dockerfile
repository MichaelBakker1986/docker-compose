FROM node:9.8.0-alpine

USER root

ADD / /

CMD npm install -g concurrently && npm install --unsafe-perm --allow-root && npm start