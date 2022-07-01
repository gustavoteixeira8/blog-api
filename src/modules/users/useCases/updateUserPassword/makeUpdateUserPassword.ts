import { UpdateUserPasswordController } from './UpdateUserPasswordController';
import { UpdateUserPasswordUseCase } from './UpdateUserPasswordUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { makeDateAdapter } from '@shared/adapters/dateAdapter/makeDateAdapter';
import { makeHashAdapter } from '@shared/adapters/hashAdapter/makeHashAdapter';
import { makeMailQueueAdapter } from '@shared/adapters/queueAdapter/makeMailQueueAdapter';
import { makeTokenAdapter } from '@shared/adapters/tokenAdapter/makeTokenAdapter';
import { makeUserRepository } from '../../repositories/implementations/makeUserRepository';
import { makeUserTokenRepository } from '../../repositories/implementations/makeUserTokenRepository';

export const makeUpdateUserPassword = (): WebController => {
  const userRepository = makeUserRepository();
  const userTokenRepository = makeUserTokenRepository();
  const dateAdapter = makeDateAdapter();
  const tokenAdapter = makeTokenAdapter();
  const hashAdapter = makeHashAdapter();
  const mailQueueAdapter = makeMailQueueAdapter();
  const useCase = new UpdateUserPasswordUseCase(
    userRepository,
    userTokenRepository,
    dateAdapter,
    tokenAdapter,
    hashAdapter,
    mailQueueAdapter,
  );
  return new UpdateUserPasswordController(useCase);
};
