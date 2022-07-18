import { UserRepositoryProtocol } from '@modules/users/repositories/UserRepositoryProtocol';
import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import {
  ArticleIsNotYoursError,
  ArticleNotFoundError,
  MissingParamError,
  UserEmailIsNotVerifiedError,
  UserIsNotAdminError,
  UserNotFoundError,
} from '@shared/core/errors';
import { ArticleRepositoryProtocol } from '../../repositories/ArticleRepositoryProtocol';

export interface RecoverArticleRequest {
  articleId: string;
  userId: string;
}

export type RecoverArticleResponse = Promise<
  | void
  | ArticleIsNotYoursError
  | ArticleNotFoundError
  | MissingParamError
  | UserEmailIsNotVerifiedError
  | UserIsNotAdminError
  | UserNotFoundError
>;

export class RecoverArticleUseCase
  implements UseCaseProtocol<RecoverArticleRequest, RecoverArticleResponse>
{
  constructor(
    private readonly _articleRepository: ArticleRepositoryProtocol,
    private readonly _userRepository: UserRepositoryProtocol,
  ) {}

  public async execute({ articleId, userId }: RecoverArticleRequest): RecoverArticleResponse {
    if (!articleId || !userId) return new MissingParamError('Article id and user id');

    const [user, article] = await Promise.all([
      this._userRepository.findById(userId, { withDeleted: false }),
      this._articleRepository.findById(articleId, { withDeleted: true }),
    ]);

    if (!user) return new UserNotFoundError('User not found');

    if (!user.isEmailVerified) {
      return new UserEmailIsNotVerifiedError();
    }

    if (!user.isAdmin) {
      return new UserIsNotAdminError();
    }

    if (!article || !article.deletedAt) {
      return new ArticleNotFoundError();
    }

    if (article.userId.value !== user.id.value) {
      return new ArticleIsNotYoursError();
    }

    article.recover();

    await this._articleRepository.save(article);
  }
}
