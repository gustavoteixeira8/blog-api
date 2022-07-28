import { SendVerificationEmailController } from './SendVerificationEmailController';
import { SendVerificationEmailUseCase } from './SendVerificationEmailUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { makeDateAdapter } from '@shared/adapters/dateAdapter/makeDateAdapter';
import { makeMailQueueAdapter } from '@shared/adapters/queueAdapter/makeMailQueueAdapter';
import { makeUserRepository } from '../../repositories/implementations/makeUserRepository';
import { makeUserTokenRepository } from '../../repositories/implementations/makeUserTokenRepository';

export const makeSendVerificationEmail = (): WebController => {
  const userRepository = makeUserRepository();
  const userTokenRepository = makeUserTokenRepository();
  const dateAdapter = makeDateAdapter();
  const mailQueueAdapter = makeMailQueueAdapter();
  const useCase = new SendVerificationEmailUseCase(
    userRepository,
    userTokenRepository,
    dateAdapter,
    mailQueueAdapter,
  );
  return new SendVerificationEmailController(useCase);
};
