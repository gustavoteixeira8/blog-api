import { RedisOptions } from 'ioredis';

export const cacheConfig = {
  redis: {
    host: process.env.REDIS_HOST as string,
    port: Number(process.env.REDIS_PORT) as number,
    password: process.env.REDIS_PASSWORD as string,
    autoResubscribe: false,
    tls: {
      rejectUnauthorized: false,
    },
  } as RedisOptions,
};
