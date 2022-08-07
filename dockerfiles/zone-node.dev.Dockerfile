FROM node:alpine as build
WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
COPY packages/message-types ./packages/message-types
COPY packages/utils ./packages/utils
COPY packages/game ./packages/game
WORKDIR /usr/src/app/packages/message-types
RUN yarn install
RUN yarn run build
WORKDIR /usr/src/app/packages/game
RUN yarn install
RUN yarn run build
WORKDIR /usr/src/app/packages/utils
RUN yarn install
RUN yarn run build
WORKDIR /usr/src/app
COPY packages/zone-node ./packages/zone-node

RUN yarn install --pure-lockfile --non-interactive
WORKDIR /usr/src/app/packages/zone-node
CMD ["yarn", "serve"]