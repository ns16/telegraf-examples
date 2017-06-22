FROM node:7.5.0

RUN apt-get update && apt-get install -y build-essential

RUN npm i -g yarn \
  nodemon \
  pm2

RUN mkdir /opt/bot

WORKDIR /opt/bot

COPY . /opt/bot
