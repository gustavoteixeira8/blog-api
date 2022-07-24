import { makeRedisAuthStorage } from '@modules/users/cache/auth/makeRedisAuthStorage';
import { makeTokenAdapter } from '@shared/adapters/tokenAdapter/makeTokenAdapter';
import { LogoutUserController } from './LogoutUserController';
import { LogoutUserUseCase } from './LogoutUserUseCase';

export const makeLogoutUser = () => {
  const redisAuthStorage = makeRedisAuthStorage();
  const tokenAdapter = makeTokenAdapter();
  const useCase = new LogoutUserUseCase(redisAuthStorage, tokenAdapter);
  return new LogoutUserController(useCase);
};
