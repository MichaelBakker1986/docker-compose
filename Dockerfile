FROM node:11.0.0

MAINTAINER Michael Bakker "michaelbakker1986@gmail.com"
USER root

RUN npm install -g concurrently babel-cli babel-core
RUN mkdir /root/.ssh/
ADD /id_rsa /root/.ssh/id_rsa
RUN  chmod 700 /root/.ssh/id_rsa
ADD /id_rsa.pub /root/.ssh/id_rsa.pub
RUN  chmod 700 /root/.ssh/id_rsa.pub
RUN echo "Host stash.topicus.nl\n\tStrictHostKeyChecking no\n" >> root/.ssh/config
RUN git clone --progress ssh://git@stash.topicus.nl:7999/ff/financialmodel.git
RUN cd financialmodel &&  git config core.autocrlf true && git config user.email "lme_platform@topicus.com" && git config user.name "Lme Platform" && git config push.default matching && cd ..

COPY --from=library/docker:latest /usr/local/bin/docker /usr/bin/docker
COPY --from=docker/compose:1.23.0-rc3 /usr/local/bin/docker-compose /usr/bin/docker-compose

ADD /package.json /package.json
ADD /.babelrc /.babelrc
ADD /.gitignore /.gitignore
ADD /install_script.js /install_script.js
ADD /Production_Run.js /Production_Run.js

ADD /financiallanguageconverter/DatastoreCluster /financiallanguageconverter/DatastoreCluster
ADD /demo-apps /demo-apps
ADD /docker-connect /docker-connect
ADD /excel-connect /excel-connect
ADD /ffl /ffl
ADD /formulajs-connect /formulajs-connect
ADD /git-connect /git-connect
ADD /lme-core /lme-core
ADD /lme-model-api /lme-model-api
ADD /lme-data-api /lme-data-api
ADD /math /math
ADD /proxy /proxy
ADD /traefik /traefik

RUN npm install --unsafe-perm --allow-root
CMD node -r babel-register Production_Run.js
EXPOSE 7081
