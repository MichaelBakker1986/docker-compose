FROM node:9.2.0

USER root

ADD / /

EXPOSE 8080
EXPOSE 8083
CMD ["npm", "start"]