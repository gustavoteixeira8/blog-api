import { RemoveUserAdminController } from './RemoveUserAdminController';
import { RemoveUserAdminUseCase } from './RemoveUserAdminUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { makeMailQueueAdapter } from '@shared/adapters/queueAdapter/makeMailQueueAdapter';
import { makeUserRepository } from '../../repositories/implementations/makeUserRepository';

export const makeRemoveUserAdmin = (): WebController => {
  const userRepository = makeUserRepository();
  const mailQueueAdapter = makeMailQueueAdapter();
  const useCase = new RemoveUserAdminUseCase(userRepository, mailQueueAdapter);
  return new RemoveUserAdminController(useCase);
};
