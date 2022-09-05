FROM node:alpine as build
WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
RUN mkdir /usr/src/app/packages
RUN mkdir /usr/src/app/packages/utils
RUN mkdir /usr/src/app/packages/game
RUN mkdir /usr/src/app/packages/messages
RUN mkdir /usr/src/app/packages/dev-client

COPY packages/utils/package.json ./packages/utils
COPY packages/game/package.json ./packages/game
COPY packages/messages/package.json ./packages/messages
COPY packages/dev-client/package.json ./packages/dev-client

RUN yarn install --pure-lockfile --non-interactive

COPY packages/utils ./packages/utils
COPY packages/game ./packages/game
COPY packages/messages ./packages/messages
COPY packages/dev-client ./packages/dev-client

WORKDIR /usr/src/app/packages/dev-client
CMD ["yarn", "serve"]