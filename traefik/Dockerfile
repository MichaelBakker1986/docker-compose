FROM node:10.11.0

USER root
ENV PORT 3000
ENV NODE_ENV production

COPY . .
#COPY --from=library/docker:latest /usr/local/bin/docker /usr/bin/docker
COPY --from=docker/compose:1.23.0-rc3 /usr/local/bin/docker-compose /usr/bin/docker-compose

RUN npm install --unsafe-perm --allow-root --no-optional
CMD npm start
EXPOSE 80 8080 3000