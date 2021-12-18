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
import { MailOptionsProtocol } from '@shared/providers/mailProvider/MailProvider';
import { QueueProviderProtocol } from '@shared/providers/queueProvider/QueueProviderProtocol';
import { inject, injectable } from 'tsyringe';
import { ArticleRepositoryProtocol } from '../repositories/ArticleRepositoryProtocol';

export interface DeleteArticleRequest {
  articleId: string;
  userId: string;
}

@injectable()
export class SoftDeleteArticleUseCase
  implements UseCaseProtocol<DeleteArticleRequest, Promise<void>>
{
  constructor(
    @inject('UserRepository')
    private readonly _userRepository: UserRepositoryProtocol,
    @inject('ArticleRepository')
    private readonly _articleRepository: ArticleRepositoryProtocol,
    @inject('MailQueueProvider')
    private readonly _mailQueueProvider: QueueProviderProtocol<MailOptionsProtocol>,
  ) {}

  public async execute({ articleId, userId }: DeleteArticleRequest): Promise<void> {
    if (!articleId) throw new MissingParamError('Article id');

    if (!userId) throw new MissingParamError('User id');

    const user = await this._userRepository.findById(userId, { withDeleted: false });

    if (!user) throw new UserNotFoundError();

    if (!user.isEmailVerified) {
      throw new UserEmailIsNotVerifiedError();
    }
    if (!user.isAdmin) {
      throw new UserIsNotAdminError();
    }

    const article = await this._articleRepository.findById(articleId, { withDeleted: false });

    if (!article) throw new ArticleNotFoundError();

    if (article.userId.value !== user.id.value) {
      throw new ArticleIsNotYoursError();
    }

    article.delete();
    article.makePrivate();

    await Promise.all([
      this._articleRepository.save(article),
      this._mailQueueProvider.add({
        to: {
          name: user.fullName.value,
          address: user.email.value,
        },
        subject: `An article was deleted by you - ${appConfig.name}`,
        context: {
          user: { username: user.username.value },
          article: {
            id: article.id.value,
            title: article.title.value,
            slug: article.slug.value,
            isPublic: article.isPublic,
            createdAt: article.createdAt,
          },
          appConfig,
        },
        html: {
          filename: 'articleSoftDeleted',
          module: 'articles',
        },
      }),
    ]);
  }
}
