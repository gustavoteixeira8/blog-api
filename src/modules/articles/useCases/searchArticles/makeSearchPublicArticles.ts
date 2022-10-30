import { makeArticleRepository } from '@modules/articles/repositories/implementations/makeArticleRepository';
import { WebController } from '@shared/core/controllers/WebController';
import { SearchArticlesController } from './SearchArticlesController';
import { SearchArticlesUseCase } from './SearchArticlesUseCase';

export const makeSearchPublicArticles = (): WebController => {
  const articleRepository = makeArticleRepository();
  const useCase = new SearchArticlesUseCase(articleRepository);
  return new SearchArticlesController(useCase);
};
