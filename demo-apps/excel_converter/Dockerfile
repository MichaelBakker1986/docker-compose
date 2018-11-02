FROM node:11.0.0-alpine

USER root
ENV PORT 80
ENV NODE_ENV production

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY web web
COPY resources resources
COPY dist .
#browserify cannot be browserified..
RUN npm install --unsafe-perm --allow-root --production browserify-middleware
CMD npm start
EXPOSE 80