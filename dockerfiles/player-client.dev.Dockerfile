# FROM node:16-alpine
FROM node:14
ENV CI=true
WORKDIR /usr/src/app
COPY package.json .
# COPY yarn.lock .
COPY packages/message-types ./packages/message-types
COPY packages/game ./packages/game
COPY packages/utils ./packages/utils
RUN yarn cache list
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
COPY packages/player-client/package.json ./packages/player-client/package.json
RUN yarn install --non-interactive
COPY packages/player-client ./packages/player-client
WORKDIR /usr/src/app/packages/player-client/
CMD ["yarn", "start"]

# FROM node:16-alpine
# ENV CI=true
 
# WORKDIR /usr/src/app
# COPY package.json .
# COPY yarn.lock .
# COPY packages/message-types ./packages/message-types
# COPY packages/game ./packages/game
# RUN yarn install --non-interactive
# COPY packages/player-client ./packages/player-client
# CMD ["yarn", "run", "start"]