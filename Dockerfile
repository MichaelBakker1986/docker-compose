FROM node:9.2.0

USER root

ADD / /

EXPOSE 8080
EXPOSE 8082
EXPOSE 8083
EXPOSE 8084
EXPOSE 8085

CMD npm install -g bower && npm install -g concurrently && npm install --unsafe-perm --allow-root && npm start