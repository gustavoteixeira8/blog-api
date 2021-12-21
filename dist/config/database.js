"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.databaseConfig = void 0;

var _Camelcase = require("../shared/infra/database/namingStrategies/Camelcase");

const databaseConfig = {
  postgres: {
    type: process.env.POSTGRES_TYPE,
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    timezone: '+00:00',
    charset: 'utf8',
    namingStrategy: new _Camelcase.CamelcaseStrategy(),
    entities: ['./dist/shared/infra/database/entities/*.js'],
    migrations: ['./dist/shared/infra/database/migrations/*.js'],
    cli: {
      migrationsDir: './dist/shared/infra/database/migrations'
    }
  }
};
exports.databaseConfig = databaseConfig;