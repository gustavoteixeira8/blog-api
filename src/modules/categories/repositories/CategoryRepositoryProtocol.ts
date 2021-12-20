import {
  PaginationOptionsProtocol,
  PaginationResponseProtocol,
} from '@shared/core/repositories/PaginationProtocol';
import { Category } from '../entities/Category';

export type CategoriesPaginateResponse = PaginationResponseProtocol<Category>;

export interface CategoryRepositoryProtocol {
  save(category: Category): Promise<void>;
  delete(categoryId: string): Promise<void>;
  findById(categoryId: string): Promise<Category | undefined>;
  existsWithSlug(slug: string): Promise<boolean>;
  findAllPaginate(pagination: PaginationOptionsProtocol): Promise<CategoriesPaginateResponse>;
  existsInArticle(categoryId: string): Promise<boolean>;
}
