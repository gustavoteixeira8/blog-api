import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import {
  ArticleNotFoundError,
  MissingParamError,
  UserIsNotAdminError,
  UserNotFoundError,
} from '@shared/core/errors';
import { ArticleWithRelationsDTO } from '@modules/articles/dtos/ArticleWithRelationsDTO';
import { ArticleRepositoryProtocol } from '@modules/articles/repositories/ArticleRepositoryProtocol';
import { UserRepositoryProtocol } from '../../../users/repositories/UserRepositoryProtocol';

export interface ShowArticleBySlugRequest {
  articleSlug: string;
  userId: string;
}

export type ShowArticleBySlugResponse = Promise<
  | MissingParamError
  | UserNotFoundError
  | UserIsNotAdminError
  | ArticleNotFoundError
  | ArticleWithRelationsDTO
>;

export class ShowArticleBySlugUseCase
  implements UseCaseProtocol<ShowArticleBySlugRequest, ShowArticleBySlugResponse>
{
  constructor(
    private readonly _articleRepository: ArticleRepositoryProtocol,
    private readonly _userRepository: UserRepositoryProtocol,
  ) {}

  public async execute({
    articleSlug,
    userId,
  }: ShowArticleBySlugRequest): ShowArticleBySlugResponse {
    if (!articleSlug) return new MissingParamError('Article slug');

    const articleWithRelations = await this._articleRepository.findBySlugWithRelations(articleSlug);

    if (!articleWithRelations) return new ArticleNotFoundError();

    if (articleWithRelations.article.isPublic && !articleWithRelations.article.deletedAt) {
      return articleWithRelations;
    }

    if (!userId) return new UserIsNotAdminError();

    const user = await this._userRepository.findById(userId, { withDeleted: false });

    if (!user) return new UserNotFoundError();

    if (!user.isAdmin) return new UserIsNotAdminError();

    return articleWithRelations;
  }
}
