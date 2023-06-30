FROM node:17-alpine3.14

WORKDIR /base

RUN chmod -R 755 ./

RUN apk update && apk add bash

COPY ./tsconfig.json ./
COPY ./tsconfig.build.json ./
COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./src ./src/
#COPY ./.npmrc ./

RUN npm install --unsafe-perm --legacy-peer-deps

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]