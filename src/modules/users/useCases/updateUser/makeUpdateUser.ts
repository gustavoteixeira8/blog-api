import { UpdateUserController } from './UpdateUserController';
import { UpdateUserUseCase } from './UpdateUserUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { makeMailQueueAdapter } from '@shared/adapters/queueAdapter/makeMailQueueAdapter';
import { makeUserRepository } from '../../repositories/implementations/makeUserRepository';

export const makeUpdateUser = (): WebController => {
  const userRepository = makeUserRepository();
  const mailQueueAdapter = makeMailQueueAdapter();
  const useCase = new UpdateUserUseCase(userRepository, mailQueueAdapter);
  return new UpdateUserController(useCase);
};
