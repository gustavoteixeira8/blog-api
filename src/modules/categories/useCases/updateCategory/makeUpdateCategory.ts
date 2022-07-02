import { makeCategoryRepository } from '@modules/categories/repositories/implementations/makeCategoryRepository';
import { makeUserRepository } from '@modules/users/repositories/implementations/makeUserRepository';
import { makeSlugAdapter } from '@shared/adapters/slugAdapter/makeSlugAdapter';
import { WebController } from '@shared/core/controllers/WebController';
import { UpdateCategoryController } from './UpdateCategoryController';
import { UpdateCategoryUseCase } from './UpdateCategoryUseCase';

export const makeUpdateCategory = (): WebController => {
  const categoryRepository = makeCategoryRepository();
  const userRepository = makeUserRepository();
  const slugAdapter = makeSlugAdapter();
  const useCase = new UpdateCategoryUseCase(categoryRepository, userRepository, slugAdapter);
  return new UpdateCategoryController(useCase);
};
