import { AddRoleAdminToUserController } from './AddRoleAdminToUserController';
import { AddRoleAdminToUserUseCase } from './AddRoleAdminToUserUseCase.ts';
import { WebController } from '@shared/core/controllers/WebController';
import { makeMailQueueAdapter } from '@shared/adapters/queueAdapter/makeMailQueueAdapter';
import { makeUserRepository } from '../../repositories/implementations/makeUserRepository';

export const makeAddRoleAdminToUser = (): WebController => {
  const userRepository = makeUserRepository();
  const mailQueueAdapter = makeMailQueueAdapter();
  const useCase = new AddRoleAdminToUserUseCase(userRepository, mailQueueAdapter);
  return new AddRoleAdminToUserController(useCase);
};
