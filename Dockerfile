FROM node:16.18.0-alpine AS builder

WORKDIR /app

COPY package.json .
COPY yarn.lock .


RUN yarn install

COPY . .

RUN yarn build

FROM node:16.18.0-alpine

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/dist ./dist

CMD [ "yarn", "start:prod" ]
