import { UserRepositoryOrm } from '@modules/users/repositories/implementations/UserRepositoryOrm';
import { UserRepositoryProtocol } from '@modules/users/repositories/UserRepositoryProtocol';

export const makeUserRepository = (): UserRepositoryProtocol => {
  return new UserRepositoryOrm();
};
