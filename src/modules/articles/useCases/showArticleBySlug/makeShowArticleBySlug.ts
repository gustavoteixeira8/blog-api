import { ShowArticleBySlugController } from './ShowArticleBySlugController';
import { ShowArticleBySlugUseCase } from './ShowArticleBySlugUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { makeArticleRepository } from '@modules/articles/repositories/implementations/makeArticleRepository';
import { makeUserRepository } from '@modules/users/repositories/implementations/makeUserRepository';

export const makeShowArticleBySlug = (): WebController => {
  const userRepository = makeUserRepository();
  const articleRepository = makeArticleRepository();
  const useCase = new ShowArticleBySlugUseCase(articleRepository, userRepository);
  return new ShowArticleBySlugController(useCase);
};
