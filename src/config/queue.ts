import { QueueOptions } from 'bull';
import { cacheConfig } from './cache';

export const queueConfig = {
  mailQueue: {
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
      removeOnComplete: true,
      timeout: 10_000,
    },
    limiter: {
      max: 100,
      duration: 5000,
    },
    prefix: 'mail',
    redis: {
      ...cacheConfig.redis,
      db: 0,
    },
  } as QueueOptions,
  storageQueue: {
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
      removeOnComplete: true,
      timeout: 10_000,
    },
    limiter: {
      max: 100,
      duration: 5000,
    },
    prefix: 'storage',
    redis: {
      ...cacheConfig.redis,
      db: 0,
    },
  } as QueueOptions,
};
