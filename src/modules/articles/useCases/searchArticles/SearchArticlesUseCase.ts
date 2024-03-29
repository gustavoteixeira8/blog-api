import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { OrderByProtocol } from '@shared/core/repositories/PaginationProtocol';
import {
  ArticleRepositoryProtocol,
  ArticlesPaginateResponse,
  SearchArticlesPaginate,
} from '../../repositories/ArticleRepositoryProtocol';
import {
  UserEmailIsNotVerifiedError,
  UserIsNotAdminError,
  UserNotFoundError,
} from '@shared/core/errors';

export interface SearchArticlesParams {
  categoryName?: string;
  articleTitle?: string;
  username?: string;
}

export type SearchArticlesRequest = SearchArticlesPaginate<SearchArticlesParams>;

export type SearchArticlesResponse = Promise<
  ArticlesPaginateResponse | UserNotFoundError | UserIsNotAdminError | UserEmailIsNotVerifiedError
>;

export class SearchArticlesUseCase
  implements UseCaseProtocol<SearchArticlesRequest, SearchArticlesResponse>
{
  constructor(private readonly _articleRepository: ArticleRepositoryProtocol) {}

  public async execute({
    order,
    page,
    perPage,
    articleTitle,
    categoryName,
    username,
  }: SearchArticlesRequest): SearchArticlesResponse {
    const take = !perPage || perPage > 1000 ? 1000 : Math.ceil(perPage);
    const skip = page ? take * (Math.ceil(page) - 1) : 0;
    const orderByDefault = Object.keys(order || {}).length ? order : { createdAt: 'DESC' };
    const pagination = {
      order: orderByDefault as OrderByProtocol,
      page: skip,
      perPage: take,
    };

    const articles = await this._articleRepository.searchWithRelations(
      { articleTitle, categoryName, username, isPublic: true, isDeleted: false },
      pagination,
    );

    return articles;
  }
}
