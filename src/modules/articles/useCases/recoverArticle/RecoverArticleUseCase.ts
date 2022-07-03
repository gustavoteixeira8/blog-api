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

export class RecoverArticleUseCase
  implements UseCaseProtocol<RecoverArticleRequest, Promise<void>>
{
  constructor(
    private readonly _articleRepository: ArticleRepositoryProtocol,
    private readonly _userRepository: UserRepositoryProtocol,
  ) {}

  public async execute({ articleId, userId }: RecoverArticleRequest): Promise<void> {
    if (!articleId || !userId) throw new MissingParamError('Article id and user id');

    const [user, article] = await Promise.all([
      this._userRepository.findById(userId, { withDeleted: false }),
      this._articleRepository.findById(articleId, { withDeleted: true }),
    ]);

    if (!user) throw new UserNotFoundError('User not found');

    if (!user.isEmailVerified) {
      throw new UserEmailIsNotVerifiedError();
    }

    if (!user.isAdmin) {
      throw new UserIsNotAdminError();
    }

    if (!article || !article.deletedAt) {
      throw new ArticleNotFoundError();
    }

    if (article.userId.value !== user.id.value) {
      throw new ArticleIsNotYoursError();
    }

    article.recover();

    await this._articleRepository.save(article);
  }
}
