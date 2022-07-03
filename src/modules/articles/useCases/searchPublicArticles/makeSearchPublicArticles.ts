import { makeArticleRepository } from '@modules/articles/repositories/implementations/makeArticleRepository';
import { WebController } from '@shared/core/controllers/WebController';
import { SearchPublicArticlesController } from './SearchPublicArticlesController';
import { SearchPublicArticlesUseCase } from './SearchPublicArticlesUseCase';

export const makeSearchPublicArticles = (): WebController => {
  const articleRepository = makeArticleRepository();
  const useCase = new SearchPublicArticlesUseCase(articleRepository);
  return new SearchPublicArticlesController(useCase);
};
