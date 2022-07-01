import { SendUpdatePasswordEmailController } from './SendUpdatePasswordEmailController';
import { SendUpdatePasswordEmailUseCase } from './SendUpdatePasswordEmailUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { makeDateAdapter } from '@shared/adapters/dateAdapter/makeDateAdapter';
import { makeMailQueueAdapter } from '@shared/adapters/queueAdapter/makeMailQueueAdapter';
import { makeTokenAdapter } from '@shared/adapters/tokenAdapter/makeTokenAdapter';
import { makeUserRepository } from '../../repositories/implementations/makeUserRepository';
import { makeUserTokenRepository } from '../../repositories/implementations/makeUserTokenRepository';

export const makeSendUpdatePasswordEmail = (): WebController => {
  const userRepository = makeUserRepository();
  const userTokenRepository = makeUserTokenRepository();
  const dateAdapter = makeDateAdapter();
  const tokenAdapter = makeTokenAdapter();
  const mailQueueAdapter = makeMailQueueAdapter();
  const useCase = new SendUpdatePasswordEmailUseCase(
    userRepository,
    userTokenRepository,
    dateAdapter,
    tokenAdapter,
    mailQueueAdapter,
  );
  return new SendUpdatePasswordEmailController(useCase);
};
