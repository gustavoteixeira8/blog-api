import { MakeUserAdminController } from './MakeUserAdminController';
import { MakeUserAdminUseCase } from './MakeUserAdminUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { makeMailQueueAdapter } from '@shared/adapters/queueAdapter/makeMailQueueAdapter';
import { makeUserRepository } from '../../repositories/implementations/makeUserRepository';

export const makeMakeUserAdmin = (): WebController => {
  const userRepository = makeUserRepository();
  const mailQueueAdapter = makeMailQueueAdapter();
  const useCase = new MakeUserAdminUseCase(userRepository, mailQueueAdapter);
  return new MakeUserAdminController(useCase);
};
