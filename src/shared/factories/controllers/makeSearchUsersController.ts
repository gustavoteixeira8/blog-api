import { SearchUsersController } from '@modules/users/infra/http/controllers/SearchUsersController';
import { SearchUsersUseCase } from '@modules/users/useCases/SearchUsersUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { makeUserRepository } from '../repositories/makeUserRepository';

export const makeSearchUsersController = (): WebController => {
  const userRepository = makeUserRepository();
  const useCase = new SearchUsersUseCase(userRepository);
  return new SearchUsersController(useCase);
};
