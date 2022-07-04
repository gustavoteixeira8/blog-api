import { makeTokenAdapter } from '@shared/adapters/tokenAdapter/makeTokenAdapter';
import { WebMiddleware } from '@shared/core/middlewares/WebMiddleware';
import { EnsureAuthenticationMiddleware } from './EnsureAuthenticationMiddleware';

export const makeEnsureAuthentication = (): WebMiddleware => {
  const tokenAdapter = makeTokenAdapter();
  return new EnsureAuthenticationMiddleware(tokenAdapter);
};
