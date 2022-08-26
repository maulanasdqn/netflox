FROM node:gallium-alpine AS build

ENV PORT=3000

WORKDIR /usr/app

RUN npm install --location=global pm2

COPY ./package.json ./

COPY ./yarn.lock ./

RUN yarn --production

COPY ./ ./

RUN yarn build

USER node

CMD [ "pm2-runtime", "npm", "--", "start" ]
