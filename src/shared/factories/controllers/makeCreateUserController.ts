import { CreateUserController } from '@modules/users/infra/http/controllers/CreateUserController';
import { CreateUserUseCase } from '@modules/users/useCases/CreateUserUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { makeHashAdapter } from '../adapters/makeHashAdapter';
import { makeMailQueueAdapter } from '../adapters/makeMailQueueAdapter';
import { makeUserRepository } from '../repositories/makeUserRepository';

export const makeCreateUserController = (): WebController => {
  const userRepository = makeUserRepository();
  const hashAdapter = makeHashAdapter();
  const mailQueueAdapter = makeMailQueueAdapter();
  const useCase = new CreateUserUseCase(userRepository, hashAdapter, mailQueueAdapter);
  const controller = new CreateUserController(useCase);
  return controller;
};
