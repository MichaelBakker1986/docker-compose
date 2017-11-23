# use a node base image
FROM node:9.2.0

# set maintainer
LABEL maintainer = "michael.bakker@topicus.nl"
# Install app dependencies
COPY package.json .
RUN npm install
COPY . .
CMD [ "npm", "start" ]
# tell docker what port to expose
EXPOSE 10080