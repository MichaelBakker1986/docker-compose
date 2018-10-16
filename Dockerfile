FROM node:10.11.0-alpine

USER root

ADD / /

RUN npm install -g concurrently babel-cli babel-core
RUN npm install --unsafe-perm --allow-root
CMD node -r babel-register devrun
EXPOSE 7081