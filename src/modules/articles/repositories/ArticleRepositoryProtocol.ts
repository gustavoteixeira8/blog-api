import {
  PaginationOptionsProtocol,
  PaginationResponseProtocol,
} from '@shared/core/repositories/PaginationProtocol';
import { RepositoryOptions } from '@shared/core/repositories/RepositoryOptions';
import { ArticleWithRelationsDTO } from '../dtos/ArticleWithRelationsDTO';
import { Article } from '../entities/Article';

export type SearchArticlesForCreatorProtocol = {
  isPublic?: boolean;
  isDeleted?: boolean;
  categoryName?: string;
  articleTitle?: string;
  userId: string;
};

export type SearchArticlesProtocol = {
  categoryName?: string;
  articleTitle?: string;
  username?: string;
};

export type SearchArticlesPaginate<T> = Partial<PaginationOptionsProtocol> & T;

export type ArticlesPaginateResponse = PaginationResponseProtocol<ArticleWithRelationsDTO>;

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
  searchWithRelations(
    searchOptions: SearchArticlesProtocol,
    pagination: PaginationOptionsProtocol,
  ): Promise<ArticlesPaginateResponse>;
  searchForCreatorWithRelations(
    searchOptions: SearchArticlesForCreatorProtocol,
    pagination: PaginationOptionsProtocol,
  ): Promise<ArticlesPaginateResponse>;
}
