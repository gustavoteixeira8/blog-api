import { UserRepositoryProtocol } from '@modules/users/repositories/UserRepositoryProtocol';
import { MissingParamError, UserIsNotAdminError } from '@shared/core/errors';
import { OrderByProtocol } from '@shared/core/repositories/PaginationProtocol';
import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import {
  ArticleRepositoryProtocol,
  ArticlesPaginateResponse,
  SearchArticlesForCreatorProtocol,
  SearchArticlesPaginate,
} from '@modules/articles/repositories/ArticleRepositoryProtocol';

export type SearchArticlesRequest = SearchArticlesPaginate<SearchArticlesForCreatorProtocol>;
export type SearchArticlesResponse = Promise<
  ArticlesPaginateResponse | MissingParamError | UserIsNotAdminError
>;

export class SearchArticlesForUserCreatorUseCase
  implements UseCaseProtocol<SearchArticlesRequest, SearchArticlesResponse>
{
  constructor(
    private readonly _userRepository: UserRepositoryProtocol,
    private readonly _articleRepository: ArticleRepositoryProtocol,
  ) {}

  public async execute({
    order,
    page,
    perPage,
    categoryName,
    articleTitle,
    isDeleted,
    isPublic,
    userId,
  }: SearchArticlesRequest): SearchArticlesResponse {
    if (!userId) return new MissingParamError('User id');

    const user = await this._userRepository.findById(userId);

    if (!user || !user.isAdmin) return new UserIsNotAdminError();

    const take = !perPage || perPage > 20 ? 20 : Math.ceil(perPage);
    const skip = page ? take * (Math.ceil(page) - 1) : 0;
    const orderByDefault = Object.keys(order || {}).length ? order : { createdAt: 'DESC' };
    const pagination = {
      order: orderByDefault as OrderByProtocol,
      page: skip,
      perPage: take,
    };
    const searchOptions = {
      articleTitle,
      categoryName,
      isPublic,
      isDeleted,
      userId,
    };

    return await this._articleRepository.searchForCreatorWithRelations(searchOptions, pagination);
  }
}
