import { AuthenticateUserController } from './AuthenticateUserController';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { makeDateAdapter } from '@shared/adapters/dateAdapter/makeDateAdapter';
import { makeHashAdapter } from '@shared/adapters/hashAdapter/makeHashAdapter';
import { makeTokenAdapter } from '@shared/adapters/tokenAdapter/makeTokenAdapter';
import { makeUserRepository } from '../../repositories/implementations/makeUserRepository';
import { makeRedisAuthStorage } from '@modules/users/cache/auth/makeRedisAuthStorage';

export const makeAuthenticateUser = (): WebController => {
  const userRepository = makeUserRepository();
  const tokenAdapter = makeTokenAdapter();
  const dateAdapter = makeDateAdapter();
  const hashAdapter = makeHashAdapter();
  const authService = makeRedisAuthStorage();
  const useCase = new AuthenticateUserUseCase(
    userRepository,
    authService,
    tokenAdapter,
    dateAdapter,
    hashAdapter,
  );
  const controller = new AuthenticateUserController(useCase);
  return controller;
};
