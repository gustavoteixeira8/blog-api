import { SearchUsersController } from './SearchUsersController';
import { SearchUsersUseCase } from './SearchUsersUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { makeUserRepository } from '../../repositories/implementations/makeUserRepository';

export const makeSearchUsersController = (): WebController => {
  const userRepository = makeUserRepository();
  const useCase = new SearchUsersUseCase(userRepository);
  return new SearchUsersController(useCase);
};
