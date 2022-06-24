import { SendVerificationEmailController } from '@modules/users/infra/http/controllers/SendVerificationEmailController';
import { SendVerificationEmailUseCase } from '@modules/users/useCases/SendVerificationEmailUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { makeDateAdapter } from '../adapters/makeDateAdapter';
import { makeMailQueueAdapter } from '../adapters/makeMailQueueAdapter';
import { makeTokenAdapter } from '../adapters/makeTokenAdapter';
import { makeUserRepository } from '../repositories/makeUserRepository';
import { makeUserTokenRepository } from '../repositories/makeUserTokenRepository';

export const makeSendVerificationEmailController = (): WebController => {
  const userRepository = makeUserRepository();
  const userTokenRepository = makeUserTokenRepository();
  const dateAdapter = makeDateAdapter();
  const tokenAdapter = makeTokenAdapter();
  const mailQueueAdapter = makeMailQueueAdapter();
  const useCase = new SendVerificationEmailUseCase(
    userRepository,
    userTokenRepository,
    dateAdapter,
    tokenAdapter,
    mailQueueAdapter,
  );
  return new SendVerificationEmailController(useCase);
};
