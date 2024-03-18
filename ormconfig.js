require('dotenv/config');

module.exports = {
  type: process.env.POSTGRES_TYPE,
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  timezone: '',
  charset: 'utf8',
  entities: ['./dist/shared/infra/database/entities/*.js'],
  migrations: ['./dist/shared/infra/database/migrations/*.js'],
  cli: {
    migrationsDir: './dist/shared/infra/database/migrations',
  },
};
