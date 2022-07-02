import { makeCategoryRepository } from '@modules/categories/repositories/implementations/makeCategoryRepository';
import { makeUserRepository } from '@modules/users/repositories/implementations/makeUserRepository';
import { WebController } from '@shared/core/controllers/WebController';
import { DeleteCategoryController } from './DeleteCategoryController';
import { DeleteCategoryUseCase } from './DeleteCategoryUseCase';

export const makeDeleteCategory = (): WebController => {
  const categoryRepository = makeCategoryRepository();
  const userRepository = makeUserRepository();
  const useCase = new DeleteCategoryUseCase(categoryRepository, userRepository);
  return new DeleteCategoryController(useCase);
};
