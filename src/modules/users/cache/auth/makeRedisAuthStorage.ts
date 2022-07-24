import { cacheConfig } from '@config/cache';
import { RedisProvider } from '@shared/infra/cache';
import { RedisAuthStorage } from './implementations/RedisAuthStorage';

export const makeRedisAuthStorage = () => {
  const redis = RedisProvider.connect(cacheConfig.redis);
  return new RedisAuthStorage(redis);
};
