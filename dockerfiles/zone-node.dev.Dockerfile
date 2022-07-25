FROM node:alpine as build
WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
COPY packages/message-types ./packages/message-types
COPY packages/game ./packages/game
COPY packages/zone-node ./packages/zone-node

RUN yarn install --pure-lockfile --non-interactive
WORKDIR /usr/src/app/packages/zone-node
CMD ["yarn", "serve"]