FROM node:9.2.0

USER root

ADD / /
RUN npm install -g bower
RUN npm install -g concurrently
RUN npm install

EXPOSE 8080

CMD ["npm", "test"]