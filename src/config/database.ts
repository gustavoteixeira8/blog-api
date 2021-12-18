import { CamelcaseStrategy } from '@shared/infra/database/namingStrategies/Camelcase';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export const databaseConfig = {
  mysql: {
    type: process.env.MYSQL_TYPE as string,
    host: process.env.MYSQL_HOST as string,
    port: Number(process.env.MYSQL_PORT) as number,
    username: process.env.MYSQL_USERNAME as string,
    password: process.env.MYSQL_PASSWORD as string,
    database: process.env.MYSQL_DATABASE as string,
    timezone: '+00:00',
    charset: 'utf8',
    namingStrategy: new CamelcaseStrategy(),
    entities: ['./src/shared/infra/database/entities/*.ts'],
    migrations: ['./src/shared/infra/database/migrations/*.ts'],
    cli: {
      migrationsDir: './src/shared/infra/database/migrations',
    },
  } as MysqlConnectionOptions,
};
