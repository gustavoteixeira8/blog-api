import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import {
  ArticleNotFoundError,
  MissingParamError,
  UserIsNotAdminError,
  UserNotFoundError,
} from '@shared/core/errors';
import { ArticleWithRelationsDTO } from '@modules/articles/dtos/ArticleWithRelationsDTO';
import { ArticleRepositoryProtocol } from '@modules/articles/repositories/ArticleRepositoryProtocol';
import { UserRepositoryProtocol } from '../repositories/UserRepositoryProtocol';

export interface ShowArticleForCreatorRequest {
  articleSlug: string;
  userId: string;
}

export class ShowArticleForCreatorUseCase
  implements UseCaseProtocol<ShowArticleForCreatorRequest, Promise<ArticleWithRelationsDTO>>
{
  constructor(
    private readonly _articleRepository: ArticleRepositoryProtocol,
    private readonly _userRepository: UserRepositoryProtocol,
  ) {}

  public async execute({
    articleSlug,
    userId,
  }: ShowArticleForCreatorRequest): Promise<ArticleWithRelationsDTO> {
    if (!articleSlug || !userId) throw new MissingParamError('Article slug and user id');

    const user = await this._userRepository.findById(userId, { withDeleted: false });

    if (!user) throw new UserNotFoundError();

    if (!user.isAdmin) throw new UserIsNotAdminError();

    const article = await this._articleRepository.findBySlugForCreatorWithRelations(
      articleSlug,
      userId,
    );

    if (!article) throw new ArticleNotFoundError();

    return article;
  }
}
