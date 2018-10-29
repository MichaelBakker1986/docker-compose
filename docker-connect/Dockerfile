FROM node:10.11.0-alpine

USER root
ENV PORT 80
ENV NODE_ENV production
ENV ENABLED_MODELS $ENABLED_MODELS
#COPY package.json package.json
COPY . .
#COPY package-lock.json package-lock.json
#COPY dist .

RUN npm install --unsafe-perm --allow-root --no-optional
CMD npm start
EXPOSE 80