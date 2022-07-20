import { makeArticleRepository } from '@modules/articles/repositories/implementations/makeArticleRepository';
import { makeUserRepository } from '@modules/users/repositories/implementations/makeUserRepository';
import { makeProcessImageAdapter } from '@shared/adapters/processImageAdapter/makeProcessImageAdapter';
import { makeStorageQueueAdapter } from '@shared/adapters/queueAdapter/makeStorageQueueAdapter';
import { WebController } from '@shared/core/controllers/WebController';
import { UpdateArticleThumbnailController } from './UpdateArticleThumbnailController';
import { UpdateArticleThumbnailUseCase } from './UpdateArticleThumbnailUseCase';

export const makeUpdateArticleThumbnail = (): WebController => {
  const articleRepository = makeArticleRepository();
  const userRepository = makeUserRepository();
  const storageQueueAdapter = makeStorageQueueAdapter();
  const processImage = makeProcessImageAdapter();
  const useCase = new UpdateArticleThumbnailUseCase(
    articleRepository,
    userRepository,
    storageQueueAdapter,
  );
  return new UpdateArticleThumbnailController(useCase, processImage);
};
