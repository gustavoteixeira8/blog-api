import { inject, injectable } from 'tsyringe';
import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { OrderByProtocol } from '@shared/core/repositories/PaginationProtocol';
import {
  ArticleRepositoryProtocol,
  ArticlesPaginateResponse,
  SearchArticlesPaginate,
  SearchArticlesProtocol,
} from '../repositories/ArticleRepositoryProtocol';

export type SearchArticlesRequest = SearchArticlesPaginate<SearchArticlesProtocol>;
export type SearchArticlesResponse = Promise<ArticlesPaginateResponse>;

@injectable()
export class SearchPublicArticlesUseCase
  implements UseCaseProtocol<SearchArticlesRequest, SearchArticlesResponse>
{
  constructor(
    @inject('ArticleRepository')
    private readonly _articleRepository: ArticleRepositoryProtocol,
  ) {}

  public async execute({
    order,
    page,
    perPage,
    articleTitle,
    categoryName,
    username,
  }: SearchArticlesRequest): SearchArticlesResponse {
    const take = !perPage || perPage > 20 ? 20 : Math.ceil(perPage);
    const skip = page ? take * (Math.ceil(page) - 1) : 0;
    const orderByDefault = Object.keys(order || {}).length ? order : { createdAt: 'DESC' };
    const pagination = {
      order: orderByDefault as OrderByProtocol,
      page: skip,
      perPage: take,
    };

    return await this._articleRepository.searchWithRelations(
      { articleTitle, categoryName, username },
      pagination,
    );
  }
}
