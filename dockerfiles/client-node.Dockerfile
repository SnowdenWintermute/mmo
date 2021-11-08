FROM node:alpine as build
WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
COPY packages/message-types ./packages/message-types
COPY packages/client-node ./packages/client-node

RUN yarn install --pure-lockfile --non-interactive

WORKDIR /usr/src/app/packages/message-types
RUN yarn build
WORKDIR /usr/src/app/packages/client-node
RUN yarn build

FROM node:alpine

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

COPY --from=build /usr/src/app/packages/message-types/package.json /usr/src/app/packages/message-types/package.json
COPY --from=build /usr/src/app/packages/message-types/dist /usr/src/app/packages/message-types/dist

COPY --from=build /usr/src/app/packages/client-node/package.json /usr/src/app/packages/client-node/package.json
COPY --from=build /usr/src/app/packages/client-node/dist /usr/src/app/packages/client-node/dist

ENV NODE_ENV production

RUN yarn install --pure-lockfile --non-interactive --production

WORKDIR /usr/src/app/packages/client-node

CMD ["npm", "start"]