FROM node:9.2.0
USER root
WORKDIR ../
ADD / /


RUN npm install -g concurrently
RUN npm install -g bower
RUN npm install

CMD [ "node", "lme-model-app.js" ]
EXPOSE 8080