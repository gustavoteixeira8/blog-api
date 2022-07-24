import { makeRedisAuthStorage } from '@modules/users/cache/auth/makeRedisAuthStorage';
import { makeDateAdapter } from '@shared/adapters/dateAdapter/makeDateAdapter';
import { makeTokenAdapter } from '@shared/adapters/tokenAdapter/makeTokenAdapter';
import { WebMiddleware } from '@shared/core/middlewares/WebMiddleware';
import { EnsureAuthenticationMiddleware } from './EnsureAuthenticationMiddleware';

export const makeEnsureAuthentication = (): WebMiddleware => {
  const tokenAdapter = makeTokenAdapter();
  const authService = makeRedisAuthStorage();
  const dateAdapter = makeDateAdapter();
  return new EnsureAuthenticationMiddleware(tokenAdapter, authService, dateAdapter);
};
