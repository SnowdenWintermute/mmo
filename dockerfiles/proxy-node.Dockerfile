FROM node:alpine as build
WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
COPY packages/proxy-node ./packages/proxy-node
COPY packages/messages ./packages/messages

RUN yarn install --pure-lockfile --non-interactive

WORKDIR /usr/src/app/packages/messages
RUN yarn build
WORKDIR /usr/src/app/packages/proxy-node
RUN yarn build

FROM node:alpine

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

COPY --from=build /usr/src/app/packages/messages/package.json /usr/src/app/packages/messages/package.json
COPY --from=build /usr/src/app/packages/messages/dist /usr/src/app/packages/messages/dist

COPY --from=build /usr/src/app/packages/proxy-node/package.json /usr/src/app/packages/proxy-node/package.json
COPY --from=build /usr/src/app/packages/proxy-node/dist /usr/src/app/packages/proxy-node/dist

ENV NODE_ENV production

RUN yarn install --pure-lockfile --non-interactive --production

WORKDIR /usr/src/app/packages/proxy-node

CMD ["npm", "start"]