import { ShowUserByIdController } from './ShowUserByIdController';
import { ShowUserByIdUseCase } from './ShowUserByIdUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { makeUserRepository } from '../../repositories/implementations/makeUserRepository';

export const makeShowUserById = (): WebController => {
  const userRepository = makeUserRepository();
  const useCase = new ShowUserByIdUseCase(userRepository);
  return new ShowUserByIdController(useCase);
};
