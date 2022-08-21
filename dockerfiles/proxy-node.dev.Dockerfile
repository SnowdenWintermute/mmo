FROM node:alpine as build
WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
COPY packages/messages ./packages/messages
COPY packages/game ./packages/game
COPY packages/zone-node ./packages/zone-node
COPY packages/utils ./packages/utils
WORKDIR /usr/src/app/packages/messages
RUN yarn install
RUN yarn run build
WORKDIR /usr/src/app/packages/game
RUN yarn install
RUN yarn run build
WORKDIR /usr/src/app/packages/zone-node
RUN yarn install
RUN yarn run build
WORKDIR /usr/src/app/packages/utils
RUN yarn install
RUN yarn run build
WORKDIR /usr/src/app
COPY packages/proxy-node ./packages/proxy-node

RUN yarn install --pure-lockfile --non-interactive
WORKDIR /usr/src/app/packages/proxy-node
CMD ["yarn", "serve"]