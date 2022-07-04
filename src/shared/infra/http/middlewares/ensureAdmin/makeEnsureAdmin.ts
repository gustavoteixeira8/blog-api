import { makeUserRepository } from '@modules/users/repositories/implementations/makeUserRepository';
import { WebMiddleware } from '@shared/core/middlewares/WebMiddleware';
import { EnsureAdminMiddleware } from './EnsureAdminMiddleware';

export const makeEnsureAdmin = (): WebMiddleware => {
  const userRepository = makeUserRepository();
  return new EnsureAdminMiddleware(userRepository);
};
