FROM node:18.17.1

WORKDIR /migration

ENV NODE_ENV=production

COPY dist /migration/dist
COPY package.json /migration
COPY ormconfig.js /migration

COPY .docker/migration/wait-for-it.sh /migration
RUN chmod a+x /migration/wait-for-it.sh

RUN npm i --omit=dev

ENTRYPOINT [ "./wait-for-it.sh", "--timeout=120", "postgres:5432", "--", "npm", "run", "typeorm:prod", "migration:run" ]
