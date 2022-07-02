import { makeCategoryRepository } from '@modules/categories/repositories/implementations/makeCategoryRepository';
import { WebController } from '@shared/core/controllers/WebController';
import { ShowCategoryBySlugController } from './ShowCategoryBySlugController';
import { ShowCategoryBySlugUseCase } from './ShowCategoryBySlugUseCase';

export const makeShowCategoryBySlug = (): WebController => {
  const categoryRepository = makeCategoryRepository();
  const useCase = new ShowCategoryBySlugUseCase(categoryRepository);
  return new ShowCategoryBySlugController(useCase);
};
