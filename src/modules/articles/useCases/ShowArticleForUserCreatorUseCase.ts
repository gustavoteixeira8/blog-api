import { UserRepositoryProtocol } from '@modules/users/repositories/UserRepositoryProtocol';
import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import {
  ArticleNotFoundError,
  MissingParamError,
  UserEmailIsNotVerifiedError,
  UserIsNotAdminError,
  UserNotFoundError,
} from '@shared/core/errors';
import { inject, injectable } from 'tsyringe';
import { ArticleWithRelationsDTO } from '../dtos/ArticleWithRelationsDTO';
import { ArticleRepositoryProtocol } from '../repositories/ArticleRepositoryProtocol';

export interface ShowArticleByIdRequest {
  articleId: string;
  userId: string;
}

@injectable()
export class ShowArticleForUserCreatorUseCase
  implements UseCaseProtocol<ShowArticleByIdRequest, Promise<ArticleWithRelationsDTO>>
{
  constructor(
    @inject('ArticleRepository')
    private readonly _articleRepository: ArticleRepositoryProtocol,
    @inject('UserRepository')
    private readonly _userRepository: UserRepositoryProtocol,
  ) {}

  public async execute({
    articleId,
    userId,
  }: ShowArticleByIdRequest): Promise<ArticleWithRelationsDTO> {
    if (!articleId || !userId) throw new MissingParamError('Article id and user id');

    const user = await this._userRepository.findById(userId);

    if (!user) throw new UserNotFoundError();

    if (!user.isAdmin) {
      throw new UserIsNotAdminError();
    }

    const article = await this._articleRepository.findForCreatorByIdWithRelations(
      articleId,
      userId,
    );

    if (!article) throw new ArticleNotFoundError();

    return article;
  }
}
