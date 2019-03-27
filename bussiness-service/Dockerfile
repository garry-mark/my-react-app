FROM node:8.15.0-alpine

# Bundle APP files
COPY ./ app/

# Install app dependencies
RUN cd ./app \
    && npm install -g pm2 --registry=https://registry.npm.taobao.org  \
    && apk add git \
    && pm2 install pm2-intercom

# Expose the listening port of your app
EXPOSE 5000

CMD cd /app \
    && pm2-runtime start ./ecosystem.config.js --env production \