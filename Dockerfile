FROM node:10.11.0

MAINTAINER Michael Bakker "michaelbakker1986@gmail.com"
USER root

ADD / /

#RUN apt-get update
#RUN apt-get install git apt-utils -y
RUN mkdir /root/.ssh/
ADD id_rsa /root/.ssh/id_rsa
#RUN git clone ssh://git@stash.topicus.nl:7999/ff/financialmodel.git

RUN npm install -g concurrently babel-cli babel-core
RUN npm install --unsafe-perm --allow-root
CMD node -r babel-register Developer_Run.js
EXPOSE 7081
