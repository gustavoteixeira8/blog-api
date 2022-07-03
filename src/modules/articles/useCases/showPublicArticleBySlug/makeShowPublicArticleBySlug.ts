import { makeArticleRepository } from '@modules/articles/repositories/implementations/makeArticleRepository';
import { WebController } from '@shared/core/controllers/WebController';
import { ShowPublicArticleBySlugController } from './ShowPublicArticleBySlugController';
import { ShowPublicArticleBySlugUseCase } from './ShowPublicArticleBySlugUseCase';

export const makeShowPublicArticleBySlug = (): WebController => {
  const articleRepository = makeArticleRepository();
  const useCase = new ShowPublicArticleBySlugUseCase(articleRepository);
  return new ShowPublicArticleBySlugController(useCase);
};
