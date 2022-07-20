import { appConfig } from '@config/app';
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
import { MailOptionsProtocol } from '@shared/adapters/mailAdapter/MailAdapterProtocol';
import { QueueAdapterProtocol } from '@shared/adapters/queueAdapter/QueueAdapterProtocol';
import { ArticleRepositoryProtocol } from '../../repositories/ArticleRepositoryProtocol';

export interface DeleteArticleRequest {
  articleId: string;
  userId: string;
}

export type DeleteArticleResponse = Promise<
  | void
  | ArticleIsNotYoursError
  | ArticleNotFoundError
  | MissingParamError
  | UserEmailIsNotVerifiedError
  | UserIsNotAdminError
  | UserNotFoundError
>;

export class SoftDeleteArticleUseCase
  implements UseCaseProtocol<DeleteArticleRequest, DeleteArticleResponse>
{
  constructor(
    private readonly _userRepository: UserRepositoryProtocol,
    private readonly _articleRepository: ArticleRepositoryProtocol,
    private readonly _mailQueueAdapter: QueueAdapterProtocol<MailOptionsProtocol>,
  ) {}

  public async execute({ articleId, userId }: DeleteArticleRequest): DeleteArticleResponse {
    if (!articleId || !userId) return new MissingParamError('Article id and user id');

    const user = await this._userRepository.findById(userId, { withDeleted: false });

    if (!user) return new UserNotFoundError();

    if (!user.isEmailVerified) {
      return new UserEmailIsNotVerifiedError();
    }
    if (!user.isAdmin) {
      return new UserIsNotAdminError();
    }

    const article = await this._articleRepository.findById(articleId, { withDeleted: false });

    if (!article) return new ArticleNotFoundError();

    if (article.userId.value !== user.id.value) {
      return new ArticleIsNotYoursError();
    }

    article.delete();
    article.makePrivate();

    this._articleRepository.save(article);
  }
}
