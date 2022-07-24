import { cacheConfig } from '@config/cache';
import { RedisProvider } from '@shared/infra/cache';
import { AuthStorage } from './AuthStorage';

export const makeAuthStorage = () => {
  const redis = RedisProvider.connect(cacheConfig.redis);
  return new AuthStorage(redis);
};
