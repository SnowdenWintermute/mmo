FROM node:16-alpine
WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
COPY packages/message-types ./packages/message-types
COPY packages/game ./packages/game
COPY packages/player-client ./packages/player-client

RUN yarn install --pure-lockfile --non-interactive
WORKDIR /usr/src/app/packages/player-client
CMD ["yarn", "start"]