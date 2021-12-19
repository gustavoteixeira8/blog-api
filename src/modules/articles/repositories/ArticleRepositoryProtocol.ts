import {
  PaginationOptionsProtocol,
  PaginationResponseProtocol,
} from '@shared/core/repositories/PaginationProtocol';
import { RepositoryOptions } from '@shared/core/repositories/RepositoryOptions';
import { ArticleWithRelationsDTO } from '../dtos/ArticleWithRelationsDTO';
import { Article } from '../entities/Article';

export interface ArticleRepositoryProtocol {
  save(article: Article): Promise<void>;
  delete(articleId: string): Promise<void>;
  findById(articleId: string, options?: RepositoryOptions): Promise<Article | undefined>;
  findAllDeleted(): Promise<Article[]>;
  existsWithSlug(slug: string, options?: RepositoryOptions): Promise<boolean>;
  findPublicByIdWithRelations(
    articleId: string,
    options?: RepositoryOptions,
  ): Promise<ArticleWithRelationsDTO | undefined>;
  findAllPublicWithRelations(
    pagination: PaginationOptionsProtocol,
  ): Promise<PaginationResponseProtocol<ArticleWithRelationsDTO>>;
  findAllPublicByCategoryWithRelations(
    categoryId: string,
    pagination: PaginationOptionsProtocol,
  ): Promise<PaginationResponseProtocol<ArticleWithRelationsDTO>>;
  findAllPublicByUserWithRelations(
    userId: string,
    pagination: PaginationOptionsProtocol,
  ): Promise<PaginationResponseProtocol<ArticleWithRelationsDTO>>;
}
