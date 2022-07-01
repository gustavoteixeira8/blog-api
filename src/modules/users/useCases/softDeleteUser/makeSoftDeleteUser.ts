import { SoftDeleteUserController } from './SoftDeleteUserController';
import { SoftDeleteUserUseCase } from './SoftDeleteUserUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { makeMailQueueAdapter } from '@shared/adapters/queueAdapter/makeMailQueueAdapter';
import { makeUserRepository } from '../../repositories/implementations/makeUserRepository';

export const makeSoftDeleteUser = (): WebController => {
  const userRepository = makeUserRepository();
  const mailQueueAdapter = makeMailQueueAdapter();
  const useCase = new SoftDeleteUserUseCase(userRepository, mailQueueAdapter);
  return new SoftDeleteUserController(useCase);
};
