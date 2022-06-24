import { RemoveUserAdminController } from '@modules/users/infra/http/controllers/RemoveUserAdminController';
import { RemoveUserAdminUseCase } from '@modules/users/useCases/RemoveUserAdminUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { makeMailQueueAdapter } from '../adapters/makeMailQueueAdapter';
import { makeUserRepository } from '../repositories/makeUserRepository';

export const makeRemoveUserAdminController = (): WebController => {
  const userRepository = makeUserRepository();
  const mailQueueAdapter = makeMailQueueAdapter();
  const useCase = new RemoveUserAdminUseCase(userRepository, mailQueueAdapter);
  return new RemoveUserAdminController(useCase);
};
