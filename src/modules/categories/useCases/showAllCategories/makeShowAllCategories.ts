import { makeCategoryRepository } from '@modules/categories/repositories/implementations/makeCategoryRepository';
import { WebController } from '@shared/core/controllers/WebController';
import { ShowAllCategoriesController } from './ShowAllCategoriesController';
import { ShowAllCategoriesUseCase } from './ShowAllCategoriesUseCase';

export const makeShowAllCategories = (): WebController => {
  const categoryRepository = makeCategoryRepository();
  const useCase = new ShowAllCategoriesUseCase(categoryRepository);
  return new ShowAllCategoriesController(useCase);
};
