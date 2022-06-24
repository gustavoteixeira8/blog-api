import { UserTokenRepositoryOrm } from '@modules/users/repositories/implementations/UserTokenRepositoryOrm';
import { UserTokenRepositoryProtocol } from '@modules/users/repositories/UserTokenRepositoryProtocol';

export const makeUserTokenRepository = (): UserTokenRepositoryProtocol => {
  return new UserTokenRepositoryOrm();
};
