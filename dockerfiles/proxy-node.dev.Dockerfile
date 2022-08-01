FROM node:alpine as build
WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
COPY packages/message-types ./packages/message-types
WORKDIR /usr/src/app/packages/message-types
RUN yarn install
RUN yarn run build
WORKDIR /usr/src/app
COPY packages/proxy-node ./packages/proxy-node

RUN yarn install --pure-lockfile --non-interactive
WORKDIR /usr/src/app/packages/proxy-node
CMD ["yarn", "serve"]