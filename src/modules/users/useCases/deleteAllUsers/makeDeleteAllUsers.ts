import { makeDateAdapter } from '@shared/adapters/dateAdapter/makeDateAdapter';
import { makeUserRepository } from '../../repositories/implementations/makeUserRepository';
import { DeleteAllUsersUseCase } from './DeleteAllUsersUseCase';

export const makeDeleteAllUsers = () => {
  const userRepository = makeUserRepository();
  const dateAdapter = makeDateAdapter();
  return new DeleteAllUsersUseCase(userRepository, dateAdapter);
};
