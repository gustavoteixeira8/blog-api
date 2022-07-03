import { makeArticleRepository } from '@modules/articles/repositories/implementations/makeArticleRepository';
import { makeUserRepository } from '@modules/users/repositories/implementations/makeUserRepository';
import { WebController } from '@shared/core/controllers/WebController';
import { RecoverArticleController } from './RecoverArticleController';
import { RecoverArticleUseCase } from './RecoverArticleUseCase';

export const makeRecoverArticle = (): WebController => {
  const articleRepository = makeArticleRepository();
  const userRepository = makeUserRepository();
  const useCase = new RecoverArticleUseCase(articleRepository, userRepository);
  return new RecoverArticleController(useCase);
};
