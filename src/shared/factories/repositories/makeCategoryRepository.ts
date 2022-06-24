import { CategoryRepositoryProtocol } from '@modules/categories/repositories/CategoryRepositoryProtocol';
import { CategoryRepositoryOrm } from '@modules/categories/repositories/implementations/CategoryRepositoryOrm';

export const makeCategoryRepository = (): CategoryRepositoryProtocol => {
  return new CategoryRepositoryOrm();
};
