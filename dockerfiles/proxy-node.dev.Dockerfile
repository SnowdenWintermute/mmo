FROM node:alpine as build
WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
RUN mkdir /usr/src/app/packages
RUN mkdir /usr/src/app/packages/utils
RUN mkdir /usr/src/app/packages/game
RUN mkdir /usr/src/app/packages/messages
RUN mkdir /usr/src/app/packages/proxy-node

COPY packages/messages/package.json ./packages/messages
COPY packages/utils/package.json ./packages/utils
COPY packages/game/package.json ./packages/game
COPY packages/proxy-node/package.json ./packages/proxy-node

RUN yarn install --pure-lockfile --non-interactive

COPY packages/messages ./packages/messages
COPY packages/utils ./packages/utils
COPY packages/game ./packages/game
COPY packages/proxy-node ./packages/proxy-node

WORKDIR /usr/src/app/packages/proxy-node
CMD ["yarn", "serve"]