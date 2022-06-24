import { AuthenticateUserController } from '@modules/users/infra/http/controllers/AuthenticateUserController';
import { AuthenticateUserUseCase } from '@modules/users/useCases/AuthenticateUserUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { makeDateAdapter } from '../adapters/makeDateAdapter';
import { makeHashAdapter } from '../adapters/makeHashAdapter';
import { makeTokenAdapter } from '../adapters/makeTokenAdapter';
import { makeUserRepository } from '../repositories/makeUserRepository';

export const makeAuthenticateUserController = (): WebController => {
  const userRepository = makeUserRepository();
  const tokenAdapter = makeTokenAdapter();
  const dateAdapter = makeDateAdapter();
  const hashAdapter = makeHashAdapter();
  const useCase = new AuthenticateUserUseCase(
    userRepository,
    tokenAdapter,
    dateAdapter,
    hashAdapter,
  );
  const controller = new AuthenticateUserController(useCase);
  return controller;
};
