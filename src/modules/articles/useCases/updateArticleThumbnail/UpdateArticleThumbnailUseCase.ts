import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { UserRepositoryProtocol } from '@modules/users/repositories/UserRepositoryProtocol';
import { ArticleRepositoryProtocol } from '../../repositories/ArticleRepositoryProtocol';
import { QueueAdapterProtocol } from '@shared/adapters/queueAdapter/QueueAdapterProtocol';
import { StorageOptions } from '@shared/adapters/storageAdapter/StorageAdapterProtocol';
import { ImageName } from '@shared/core/valueObjects/ImageName';
import {
  ArticleIsNotYoursError,
  ArticleNotFoundError,
  InvalidImageNameError,
  MissingParamError,
  UserEmailIsNotVerifiedError,
  UserIsNotAdminError,
  UserNotFoundError,
} from '@shared/core/errors';

export interface UpdateArticleThumbnailRequest {
  thumbnail?: string;
  articleId: string;
  userId: string;
}

export type UpdateArticleThumbnailResponse = Promise<
  | void
  | ArticleIsNotYoursError
  | ArticleNotFoundError
  | InvalidImageNameError
  | MissingParamError
  | UserEmailIsNotVerifiedError
  | UserIsNotAdminError
  | UserNotFoundError
>;

export class UpdateArticleThumbnailUseCase
  implements UseCaseProtocol<UpdateArticleThumbnailRequest, UpdateArticleThumbnailResponse>
{
  constructor(
    private readonly _articleRepository: ArticleRepositoryProtocol,
    private readonly _userRepository: UserRepositoryProtocol,
    private readonly _storageQueueAdapter: QueueAdapterProtocol<StorageOptions>,
  ) {}

  public async execute({
    thumbnail,
    articleId,
    userId,
  }: UpdateArticleThumbnailRequest): UpdateArticleThumbnailResponse {
    if (!articleId || !userId) return new MissingParamError('Article id and user id');

    const [user, article] = await Promise.all([
      this._userRepository.findById(userId),
      this._articleRepository.findById(articleId),
    ]);

    if (!user) return new UserNotFoundError('User not found');

    if (!user.isEmailVerified) {
      return new UserEmailIsNotVerifiedError();
    }
    if (!user.isAdmin) {
      return new UserIsNotAdminError();
    }
    if (!article) return new ArticleNotFoundError();

    if (article.userId.value !== user.id.value) {
      return new ArticleIsNotYoursError();
    }

    if (!thumbnail) {
      const oldName = article.thumbnail;

      if (oldName) {
        article.updateThumbnail(null);

        await Promise.all([
          this._articleRepository.save(article),
          this._storageQueueAdapter.add({
            filename: oldName.value,
            action: 'DELETE',
            filetype: 'image',
          }),
        ]);
      }

      return;
    }

    const newThumbnail = ImageName.create(thumbnail);
    const oldThumbnail = article.thumbnail?.value;

    if (newThumbnail instanceof Error) {
      return new InvalidImageNameError();
    }

    article.updateThumbnail(newThumbnail);

    if (oldThumbnail) {
      await this._storageQueueAdapter.add({
        filename: oldThumbnail,
        action: 'DELETE',
        filetype: 'image',
      });
    }

    await Promise.all([
      this._articleRepository.save(article),
      this._storageQueueAdapter.add({
        filename: newThumbnail.value,
        action: 'SAVE',
        filetype: 'image',
      }),
    ]);
  }
}
