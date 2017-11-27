FROM node:9.2.0

USER root

ADD / /

CMD npm install -g concurrently && npm install --unsafe-perm --allow-root && npm start