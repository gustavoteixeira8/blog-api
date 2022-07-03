import { makeArticleRepository } from '@modules/articles/repositories/implementations/makeArticleRepository';
import { makeDateAdapter } from '@shared/adapters/dateAdapter/makeDateAdapter';
import { DeleteAllArticlesUseCase } from './DeleteAllArticlesUseCase';

export const makeDeleteAllArticles = (): DeleteAllArticlesUseCase => {
  const articleRepository = makeArticleRepository();
  const dateAdapter = makeDateAdapter();
  return new DeleteAllArticlesUseCase(articleRepository, dateAdapter);
};
