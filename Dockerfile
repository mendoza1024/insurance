FROM mhart/alpine-node:12 AS builder

RUN apk add --no-cache bash

WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build


FROM mhart/alpine-node:12
RUN apk add --no-cache bash
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["yarn", "run", "start:prod"]