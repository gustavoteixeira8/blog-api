import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { OrderByProtocol } from '@shared/core/repositories/PaginationProtocol';
import {
  ArticleRepositoryProtocol,
  ArticlesPaginateResponse,
  SearchArticlesPaginate,
  SearchArticlesProtocol,
} from '../../repositories/ArticleRepositoryProtocol';
import {
  UserEmailIsNotVerifiedError,
  UserIsNotAdminError,
  UserNotFoundError,
} from '@shared/core/errors';
import { UserRepositoryProtocol } from '@modules/users/repositories/UserRepositoryProtocol';

export type SearchMyArticlesRequest = SearchArticlesPaginate<SearchArticlesProtocol>;

export type SearchMyArticlesResponse = Promise<
  ArticlesPaginateResponse | UserNotFoundError | UserIsNotAdminError | UserEmailIsNotVerifiedError
>;

export class SearchMyArticlesUseCase
  implements UseCaseProtocol<SearchMyArticlesRequest, SearchMyArticlesResponse>
{
  constructor(
    private readonly _articleRepository: ArticleRepositoryProtocol,
    private readonly _userRepository: UserRepositoryProtocol,
  ) {}
  public async execute({
    userId,
    isDeleted,
    isPublic,
    order,
    page,
    perPage,
    articleTitle,
    categoryName,
    username,
  }: SearchMyArticlesRequest): SearchMyArticlesResponse {
    const take = !perPage || perPage > 1000 ? 1000 : Math.ceil(perPage);
    const skip = page ? take * (Math.ceil(page) - 1) : 0;
    const orderByDefault = Object.keys(order || {}).length ? order : { createdAt: 'DESC' };
    const pagination = {
      order: orderByDefault as OrderByProtocol,
      page: skip,
      perPage: take,
    };

    const articles = await this._articleRepository.searchWithRelations(
      { articleTitle, categoryName, username, isPublic, isDeleted, userId },
      pagination,
    );

    if (!userId) return new UserIsNotAdminError();

    const user = await this._userRepository.findById(userId, { withDeleted: false });

    if (!user) return new UserNotFoundError();

    if (!user.isAdmin) {
      return new UserIsNotAdminError();
    }

    if (!user.isEmailVerified) {
      return new UserEmailIsNotVerifiedError();
    }

    return articles;
  }
}
