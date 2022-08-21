FROM node:alpine as build
WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
COPY packages/messages ./packages/messages
COPY packages/database-node ./packages/database-node

RUN yarn install --pure-lockfile --non-interactive
WORKDIR /usr/src/app/packages/database-node
RUN yarn -version
CMD ["yarn", "serve"]