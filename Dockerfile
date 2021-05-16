# BASE
FROM node:12.18-alpine3.11 AS base
WORKDIR /app
COPY package.json ./

RUN npm install
RUN npm audit fix

# RELEASE
FROM node:10.21-alpine3.11 AS relase
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . .
EXPOSE 8080 

CMD [ "npm", "start"]
