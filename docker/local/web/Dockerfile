FROM node:18-alpine3.18 AS base

#############################################################################################
FROM base AS deps

ARG TZ='Europe/Istanbul'
ENV TZ ${TZ}
RUN apk upgrade --update \
    && apk add -U tzdata \
    && cp /usr/share/zoneinfo/${TZ} /etc/localtime \
    && echo "${TZ}" > /etc/timezone \
    && apk del tzdata \
    && rm -rf \
    /var/cache/apk/*

#############################################################################################
FROM deps AS react

WORKDIR /app

COPY package*.json .
COPY yarn.lock .

RUN yarn install

#############################################################################################
FROM react AS prod

WORKDIR /app

COPY . /app

VOLUME /app

EXPOSE 8081

ENV HOST=0.0.0.0
ENV PORT=8081

CMD ["yarn", "run", "dev"]

#############################################################################################
FROM prod
