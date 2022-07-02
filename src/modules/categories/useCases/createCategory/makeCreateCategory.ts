import { makeCategoryRepository } from '@modules/categories/repositories/implementations/makeCategoryRepository';
import { makeUserRepository } from '@modules/users/repositories/implementations/makeUserRepository';
import { makeSlugAdapter } from '@shared/adapters/slugAdapter/makeSlugAdapter';
import { WebController } from '@shared/core/controllers/WebController';
import { CreateCategoryController } from './CreateCategoryController';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

export const makeCreateCategory = (): WebController => {
  const categoryRepository = makeCategoryRepository();
  const userRepository = makeUserRepository();
  const slugAdapter = makeSlugAdapter();
  const useCase = new CreateCategoryUseCase(categoryRepository, userRepository, slugAdapter);
  return new CreateCategoryController(useCase);
};
