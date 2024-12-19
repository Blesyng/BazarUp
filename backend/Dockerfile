FROM node:18-alpine

RUN mkdir -p /usr/src/bazarUp
WORKDIR /usr/src/bazarUp

RUN apk update && apk upgrade
RUN apk add git

RUN apk add  bash

RUN rm -rf ./node_modules
RUN rm -rf package-lock.json

COPY ./package.json .
RUN npm install

COPY . .
CMD npm start


