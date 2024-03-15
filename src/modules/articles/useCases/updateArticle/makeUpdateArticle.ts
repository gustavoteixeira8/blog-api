import { makeArticleRepository } from '@modules/articles/repositories/implementations/makeArticleRepository';
import { makeCategoryRepository } from '@modules/categories/repositories/implementations/makeCategoryRepository';
import { makeUserRepository } from '@modules/users/repositories/implementations/makeUserRepository';
import { makeSlugAdapter } from '@shared/adapters/slugAdapter/makeSlugAdapter';
import { WebController } from '@shared/core/controllers/WebController';
import { UpdateArticleController } from './UpdateArticleController';
import { UpdateArticleUseCase } from './UpdateArticleUseCase';

export const makeUpdateArticle = (): WebController => {
  const articleRepository = makeArticleRepository();
  const userRepository = makeUserRepository();
  const categoryRepository = makeCategoryRepository();
  const slugAdapter = makeSlugAdapter();
  const useCase = new UpdateArticleUseCase(
    articleRepository,
    categoryRepository,
    userRepository,
    slugAdapter,
  );
  return new UpdateArticleController(useCase);
};
