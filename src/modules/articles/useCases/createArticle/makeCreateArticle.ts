import { makeArticleRepository } from '@modules/articles/repositories/implementations/makeArticleRepository';
import { makeCategoryRepository } from '@modules/categories/repositories/implementations/makeCategoryRepository';
import { makeUserRepository } from '@modules/users/repositories/implementations/makeUserRepository';
import { makeSlugAdapter } from '@shared/adapters/slugAdapter/makeSlugAdapter';
import { CreateArticleController } from './CreateArticleController';
import { CreateArticleUseCase } from './CreateArticleUseCase';

export const makeCreateArticle = () => {
  const articleRepository = makeArticleRepository();
  const userRepository = makeUserRepository();
  const categoryRepository = makeCategoryRepository();
  const slugAdapter = makeSlugAdapter();
  const useCase = new CreateArticleUseCase(
    articleRepository,
    categoryRepository,
    userRepository,
    slugAdapter,
  );
  return new CreateArticleController(useCase);
};
