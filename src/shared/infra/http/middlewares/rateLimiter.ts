import { cacheConfig } from '@config/cache';
import { TooManyRequestsError } from '@shared/core/http/httpErrors';
import { RedisProvider } from '@shared/infra/cache';
import rateLimiter from 'express-rate-limit';
import slowDown from 'express-slow-down';
import RedisStoreLimiter from 'rate-limit-redis';

const redisProvider = RedisProvider.connect(cacheConfig.redis);

export const authRoutesLimiter = rateLimiter({
  store: new RedisStoreLimiter({
    client: redisProvider.client,
    prefix: 'auth-routes-limit:',
  }),
  max: 15,
  windowMs: 300_000,
  draft_polli_ratelimit_headers: true,
  statusCode: 429,
  handler(): never {
    throw new TooManyRequestsError(
      'Too many requests coming from the same IP, try again in a few moments',
    );
  },
});

export const authRoutesSlowDown = slowDown({
  store: new RedisStoreLimiter({
    client: redisProvider.client,
    prefix: 'auth-routes-slow-down:',
  }),
  skipFailedRequests: false,
  skipSuccessfulRequests: false,
  windowMs: 300_000,
  delayAfter: 3,
  delayMs: Math.floor(Math.random() * 2000),
  maxDelayMs: 60_000,
});

export const defaultLimiter = rateLimiter({
  store: new RedisStoreLimiter({
    client: redisProvider.client,
    prefix: 'default-limit:',
  }),
  max: 1000,
  windowMs: 300_000,
  draft_polli_ratelimit_headers: true,
  statusCode: 429,
  handler(): never {
    throw new TooManyRequestsError(
      'Too many requests coming from the same IP, try again in a few moments',
    );
  },
});

export const defaultSlowDown = slowDown({
  store: new RedisStoreLimiter({
    client: redisProvider.client,
    prefix: 'default-slow-down:',
  }),
  skipFailedRequests: false,
  skipSuccessfulRequests: false,
  windowMs: 300_000,
  delayAfter: 50,
  delayMs: Math.floor(Math.random() * 2000),
  maxDelayMs: 60_000,
});
