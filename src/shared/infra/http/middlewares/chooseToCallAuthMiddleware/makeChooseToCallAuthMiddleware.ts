import { WebMiddleware } from '@shared/core/middlewares/WebMiddleware';
import { makeEnsureAuthentication } from '../ensureAuth/makeEnsureAuthentication';
import { ChooseToCallAuthMiddleware } from './ChooseToCallAuthMiddleware';

export const makeChooseToCallAuthMiddleware = (): WebMiddleware => {
  const ensureAuth = makeEnsureAuthentication();
  return new ChooseToCallAuthMiddleware(ensureAuth);
};
