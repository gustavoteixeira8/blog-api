import { CreateUserController } from './CreateUserController';
import { CreateUserUseCase } from './CreateUserUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { makeHashAdapter } from '@shared/adapters/hashAdapter/makeHashAdapter';
import { makeMailQueueAdapter } from '@shared/adapters/queueAdapter/makeMailQueueAdapter';
import { makeUserRepository } from '../../repositories/implementations/makeUserRepository';

export const makeCreateUser = (): WebController => {
  const userRepository = makeUserRepository();
  const hashAdapter = makeHashAdapter();
  const mailQueueAdapter = makeMailQueueAdapter();
  const useCase = new CreateUserUseCase(userRepository, hashAdapter, mailQueueAdapter);
  const controller = new CreateUserController(useCase);
  return controller;
};
