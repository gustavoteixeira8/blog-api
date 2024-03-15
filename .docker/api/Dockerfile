FROM node:18.17.1

WORKDIR /blog

ENV NODE_ENV=production

COPY dist /blog/dist
COPY package.json /blog
COPY ormconfig.json /blog

RUN npm i --omit=dev

# RUN npm install pm2 -g

CMD [ "npm", "run", "start:server" ]
