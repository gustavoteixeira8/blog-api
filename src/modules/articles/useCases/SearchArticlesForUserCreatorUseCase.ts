import { UserRepositoryProtocol } from '@modules/users/repositories/UserRepositoryProtocol';
import {
  OrderByProtocol,
  PaginationOptionsProtocol,
  PaginationResponseProtocol,
} from '@shared/core/repositories/PaginationProtocol';
import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { inject, injectable } from 'tsyringe';
import { ArticleWithRelationsDTO } from '@modules/articles/dtos/ArticleWithRelationsDTO';
import {
  ArticleRepositoryProtocol,
  SearchArticleOptions,
} from '@modules/articles/repositories/ArticleRepositoryProtocol';
import { MissingParamError, UserIsNotAdminError, UserNotFoundError } from '@shared/core/errors';

export type SearchOptions = SearchArticleOptions & { userId: string };

export type SearchArticlesRequest = Partial<PaginationOptionsProtocol> & SearchOptions;

export type SearchArticlesResponse = Promise<PaginationResponseProtocol<ArticleWithRelationsDTO>>;

@injectable()
export class SearchArticlesForUserCreatorUseCase
  implements UseCaseProtocol<SearchArticlesRequest, SearchArticlesResponse>
{
  constructor(
    @inject('ArticleRepository')
    private readonly _articleRepository: ArticleRepositoryProtocol,
    @inject('UserRepository')
    private readonly _userRepository: UserRepositoryProtocol,
  ) {}

  public async execute({
    order,
    page,
    perPage,
    isPublic,
    categorySlug,
    withDeleted,
    title,
    userId,
  }: SearchArticlesRequest): SearchArticlesResponse {
    if (!userId) throw new MissingParamError('User id');

    const userExists = await this._userRepository.findById(userId);

    if (!userExists) throw new UserNotFoundError();

    if (!userExists.isAdmin) {
      throw new UserIsNotAdminError();
    }

    const take = !perPage || perPage > 20 ? 20 : Math.ceil(perPage);
    const skip = page ? take * (Math.ceil(page) - 1) : 0;
    const orderByDefault = Object.keys(order || {}).length ? order : { createdAt: 'DESC' };
    const pagination = {
      order: orderByDefault as OrderByProtocol,
      page: skip,
      perPage: take,
    };
    const isPublicDefault = isPublic === undefined ? true : isPublic;

    return await this._articleRepository.searchWithRelations(
      {
        isPublic: isPublicDefault,
        withDeleted,
        username: userExists.username.value,
        categorySlug,
        title,
      },
      pagination,
    );
  }
}
