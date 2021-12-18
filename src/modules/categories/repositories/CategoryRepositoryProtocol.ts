import {
  PaginationOptionsProtocol,
  PaginationResponseProtocol,
} from '@shared/core/repositories/PaginationProtocol';
import { Category } from '../entities/Category';

export interface CategoryRepositoryProtocol {
  save(category: Category): Promise<void>;
  delete(categoryId: string): Promise<void>;
  findById(categoryId: string): Promise<Category | undefined>;
  existsWithSlug(slug: string): Promise<boolean>;
  findAllPaginate(
    pagination: PaginationOptionsProtocol,
  ): Promise<PaginationResponseProtocol<Category>>;
  existsInArticle(categoryId: string): Promise<boolean>;
}
