FROM node:10.13.0-alpine

WORKDIR /app
COPY . .

RUN rm -rf ./dist
RUN npm install && npm build

CMD [ "npm", "start" ]