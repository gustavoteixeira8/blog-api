import { makeArticleRepository } from '@modules/articles/repositories/implementations/makeArticleRepository';
import { makeUserRepository } from '@modules/users/repositories/implementations/makeUserRepository';
import { WebController } from '@shared/core/controllers/WebController';
import { SearchArticlesController } from './SearchArticlesController';
import { SearchArticlesUseCase } from './SearchArticlesUseCase';

export const makeSearchPublicArticles = (): WebController => {
  const articleRepository = makeArticleRepository();
  const userRepository = makeUserRepository();
  const useCase = new SearchArticlesUseCase(articleRepository, userRepository);
  return new SearchArticlesController(useCase);
};
