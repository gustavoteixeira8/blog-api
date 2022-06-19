import { inject, injectable } from 'tsyringe';
import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { UserRepositoryProtocol } from '@modules/users/repositories/UserRepositoryProtocol';
import { ArticleRepositoryProtocol } from '../repositories/ArticleRepositoryProtocol';
import { QueueAdapterProtocol } from '@shared/adapters/queueAdapter/QueueAdapterProtocol';
import { StorageOptions } from '@shared/adapters/storageAdapter/StorageAdapterProtocol';
import { ImageName } from '@shared/core/entities/valueObjects/ImageName';
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

@injectable()
export class UpdateArticleThumbnailUseCase
  implements UseCaseProtocol<UpdateArticleThumbnailRequest, Promise<void>>
{
  constructor(
    @inject('ArticleRepository')
    private readonly _articleRepository: ArticleRepositoryProtocol,
    @inject('UserRepository')
    private readonly _userRepository: UserRepositoryProtocol,
    @inject('StorageQueueAdapter')
    private readonly _storageQueueAdapter: QueueAdapterProtocol<StorageOptions>,
  ) {}

  public async execute({
    thumbnail,
    articleId,
    userId,
  }: UpdateArticleThumbnailRequest): Promise<void> {
    if (!articleId || !userId) throw new MissingParamError('Article id and user id');

    const [user, article] = await Promise.all([
      this._userRepository.findById(userId),
      this._articleRepository.findById(articleId),
    ]);

    if (!user) throw new UserNotFoundError('User not found');

    if (!user.isEmailVerified) {
      throw new UserEmailIsNotVerifiedError();
    }
    if (!user.isAdmin) {
      throw new UserIsNotAdminError();
    }
    if (!article) throw new ArticleNotFoundError();

    if (article.userId.value !== user.id.value) {
      throw new ArticleIsNotYoursError();
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
      throw new InvalidImageNameError();
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
