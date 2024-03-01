# Build Typescript app
FROM node:18.14.1-alpine as builder
ARG NPM_TOKEN
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node . .
RUN npm ci
RUN npm run build

# Package production node_modules
FROM node:18.14-alpine as package
ARG NPM_TOKEN
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node package.json package-lock.json .npmrc ./
RUN npm ci --omit=dev --ignore-scripts

# Production image
FROM node:18.14.1-alpine as production
RUN apk update && apk --no-cache add dumb-init
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY --from=package --chown=node:node /home/node/app/node_modules node_modules
COPY --from=builder --chown=node:node /home/node/app/dist .
EXPOSE 3000
ENTRYPOINT ["/usr/bin/dumb-init"]
CMD ["node", "src/main.js"]