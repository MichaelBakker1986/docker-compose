FROM node:10.11.0

USER root
ENV PORT 3000
ENV NODE_ENV production
#COPY package.json package.json
COPY dist dist
COPY package.json package.json
COPY package-lock.json package-lock.json
#COPY package-lock.json package-lock.json
#COPY dist .

RUN npm install --unsafe-perm --allow-root --no-optional
CMD npm install speedtest-net && npm start
EXPOSE 3000