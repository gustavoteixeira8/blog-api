import { ShowUserByUsernameController } from './ShowUserByUsernameController';
import { ShowUserByUsernameUseCase } from './ShowUserByUsernameUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { makeUserRepository } from '../../repositories/implementations/makeUserRepository';

export const makeShowUserByUsername = (): WebController => {
  const userRepository = makeUserRepository();
  const useCase = new ShowUserByUsernameUseCase(userRepository);
  return new ShowUserByUsernameController(useCase);
};
