import { VerifyUserEmailController } from './VerifyUserEmailController';
import { VerifyUserEmailUseCase } from './VerifyUserEmailUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { makeDateAdapter } from '@shared/adapters/dateAdapter/makeDateAdapter';
import { makeUserRepository } from '../../repositories/implementations/makeUserRepository';
import { makeUserTokenRepository } from '../../repositories/implementations/makeUserTokenRepository';

export const makeVerifyUserEmail = (): WebController => {
  const userRepository = makeUserRepository();
  const userTokenRepository = makeUserTokenRepository();
  const dateAdapter = makeDateAdapter();
  const useCase = new VerifyUserEmailUseCase(userRepository, userTokenRepository, dateAdapter);
  return new VerifyUserEmailController(useCase);
};
