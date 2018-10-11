FROM node:10.11.0-alpine

USER root
ENV PORT 80
ENV NODE_ENV production

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY dist .

RUN npm install
CMD npm start
EXPOSE 80