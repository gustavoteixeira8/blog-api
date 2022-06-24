import { MakeUserAdminController } from '@modules/users/infra/http/controllers/MakeUserAdminController';
import { MakeUserAdminUseCase } from '@modules/users/useCases/MakeUserAdminUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { makeMailQueueAdapter } from '../adapters/makeMailQueueAdapter';
import { makeUserRepository } from '../repositories/makeUserRepository';

export const makeMakeUserAdminController = (): WebController => {
  const userRepository = makeUserRepository();
  const mailQueueAdapter = makeMailQueueAdapter();
  const useCase = new MakeUserAdminUseCase(userRepository, mailQueueAdapter);
  return new MakeUserAdminController(useCase);
};
