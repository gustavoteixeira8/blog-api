import { SendUpdatePasswordEmailController } from '@modules/users/infra/http/controllers/SendUpdatePasswordEmailController';
import { SendUpdatePasswordEmailUseCase } from '@modules/users/useCases/SendUpdatePasswordEmailUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { makeDateAdapter } from '../adapters/makeDateAdapter';
import { makeMailQueueAdapter } from '../adapters/makeMailQueueAdapter';
import { makeTokenAdapter } from '../adapters/makeTokenAdapter';
import { makeUserRepository } from '../repositories/makeUserRepository';
import { makeUserTokenRepository } from '../repositories/makeUserTokenRepository';

export const makeSendUpdatePasswordEmailController = (): WebController => {
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
