FROM node:12-alpine 
WORKDIR /app
ARG USER=node
RUN chown -R ${USER}:${USER} /app

USER ${USER}
COPY package.json .
COPY app/ ./app

RUN npm install
RUN npm audit fix

CMD [ "npm", "start"]