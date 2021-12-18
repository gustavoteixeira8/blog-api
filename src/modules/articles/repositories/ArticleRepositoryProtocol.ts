import {
  PaginationOptionsProtocol,
  PaginationResponseProtocol,
} from '@shared/core/repositories/PaginationProtocol';
import { RepositoryOptions } from '@shared/core/repositories/RepositoryOptions';
import { ArticleWithRelationsDTO } from '../dtos/ArticleWithRelationsDTO';
import { Article } from '../entities/Article';

export interface SearchArticleOptions {
  title?: string;
  categorySlug?: string;
  username?: string;
  withDeleted?: boolean;
  isPublic?: boolean;
}

export interface ArticleRepositoryProtocol {
  save(article: Article): Promise<void>;
  delete(articleId: string): Promise<void>;
  findById(articleId: string, options?: RepositoryOptions): Promise<Article | undefined>;
  existsWithSlug(slug: string, options?: RepositoryOptions): Promise<boolean>;
  findForCreatorByIdWithRelations(
    articleId: string,
    userId: string,
  ): Promise<ArticleWithRelationsDTO | undefined>;
  findPublicByIdWithRelations(
    articleId: string,
    options?: RepositoryOptions,
  ): Promise<ArticleWithRelationsDTO | undefined>;
  searchWithRelations(
    searchOptions: SearchArticleOptions,
    pagination: PaginationOptionsProtocol,
  ): Promise<PaginationResponseProtocol<ArticleWithRelationsDTO>>;
  findAllDeleted(): Promise<Article[]>;
}
