import { makeArticleRepository } from '@modules/articles/repositories/implementations/makeArticleRepository';
import { makeUserRepository } from '@modules/users/repositories/implementations/makeUserRepository';
import { makeMailQueueAdapter } from '@shared/adapters/queueAdapter/makeMailQueueAdapter';
import { SoftDeleteArticleController } from './SoftDeleteArticleController';
import { SoftDeleteArticleUseCase } from './SoftDeleteArticleUseCase';

export const makeSoftDeleteArticle = () => {
  const userRepository = makeUserRepository();
  const articleRepository = makeArticleRepository();
  const mailQueueAdapter = makeMailQueueAdapter();
  const useCase = new SoftDeleteArticleUseCase(userRepository, articleRepository, mailQueueAdapter);
  return new SoftDeleteArticleController(useCase);
};
