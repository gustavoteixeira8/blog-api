import { makeArticleRepository } from '@modules/articles/repositories/implementations/makeArticleRepository';
import { makeUserRepository } from '@modules/users/repositories/implementations/makeUserRepository';
import { WebController } from '@shared/core/controllers/WebController';
import { SearchMyArticlesController } from './SearchMyArticlesController';
import { SearchMyArticlesUseCase } from './SearchMyArticlesUseCase';

export const makeSearchMyArticles = (): WebController => {
  const articleRepository = makeArticleRepository();
  const userRepository = makeUserRepository();
  const useCase = new SearchMyArticlesUseCase(articleRepository, userRepository);
  return new SearchMyArticlesController(useCase);
};
