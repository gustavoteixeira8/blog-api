import { CamelcaseStrategy } from '@shared/infra/database/namingStrategies/Camelcase';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const databaseConfig = {
  postgres: {
    type: process.env.POSTGRES_TYPE as string,
    host: process.env.POSTGRES_HOST as string,
    port: Number(process.env.POSTGRES_PORT) as number,
    username: process.env.POSTGRES_USERNAME as string,
    password: process.env.POSTGRES_PASSWORD as string,
    database: process.env.POSTGRES_DATABASE as string,
    ssl: true,
    extra: {
      rejectUnauthorized: false,
    },
    timezone: '+00:00',
    charset: 'utf8',
    namingStrategy: new CamelcaseStrategy(),
    entities: ['./dist/shared/infra/database/entities/*.js'],
    migrations: ['./dist/shared/infra/database/migrations/*.js'],
    cli: {
      migrationsDir: './dist/shared/infra/database/migrations',
    },
  } as PostgresConnectionOptions,
};
