import { CamelcaseStrategy } from '@shared/infra/database/namingStrategies/Camelcase';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const isDevelopment = process.env.NODE_ENV === 'development';
const distOrSrc = isDevelopment ? 'src' : 'dist';
const jsOrTs = isDevelopment ? 'ts' : 'js';

export const databaseConfig = {
  postgres: {
    type: process.env.POSTGRES_TYPE as string,
    host: process.env.POSTGRES_HOST as string,
    port: Number(process.env.POSTGRES_PORT) as number,
    username: process.env.POSTGRES_USERNAME as string,
    password: process.env.POSTGRES_PASSWORD as string,
    database: process.env.POSTGRES_DATABASE as string,
    timezone: '+00:00',
    charset: 'utf8',
    namingStrategy: new CamelcaseStrategy(),
    entities: [`./${distOrSrc}/shared/infra/database/entities/*.${jsOrTs}`],
    migrations: [`./${distOrSrc}/shared/infra/database/migrations/*.${jsOrTs}`],
    cli: {
      migrationsDir: `./${distOrSrc}/shared/infra/database/migrations`,
    },
  } as PostgresConnectionOptions,
};
