"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queueConfig = void 0;

var _cache = require("./cache");

const queueConfig = {
  mailQueue: {
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000
      },
      removeOnComplete: true,
      timeout: 10_000
    },
    limiter: {
      max: 100,
      duration: 5000
    },
    prefix: 'mail',
    redis: { ..._cache.cacheConfig.redis,
      db: 0
    }
  },
  storageQueue: {
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000
      },
      removeOnComplete: true,
      timeout: 10_000
    },
    limiter: {
      max: 100,
      duration: 5000
    },
    prefix: 'storage',
    redis: { ..._cache.cacheConfig.redis,
      db: 0
    }
  }
};
exports.queueConfig = queueConfig;