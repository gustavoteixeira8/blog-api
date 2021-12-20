import multer from 'multer';
import { ensureAuthentication } from '@shared/infra/http/middlewares/ensureAuthentication';
import { ensureUserIsAdmin } from '@shared/infra/http/middlewares/ensureUserIsAdmin';
import { Router } from 'express';
import {
  createArticleController,
  recoverArticleController,
  searchPublicArticlesController,
  showPublicArticleByIdController,
  softDeleteArticleController,
  updateArticleController,
  updateArticleThumbnailController,
} from '../controllers';
import { uploadConfig } from '@config/upload';

const articleRoutes = Router();

articleRoutes.get('/', searchPublicArticlesController.handle);
articleRoutes.get('/:articleId', showPublicArticleByIdController.handle);

articleRoutes.use(ensureAuthentication);
articleRoutes.use(ensureUserIsAdmin);

articleRoutes.post('/', createArticleController.handle);
articleRoutes.put('/:articleId', updateArticleController.handle);
articleRoutes.put('/:articleId/recover', recoverArticleController.handle);
articleRoutes.delete('/:articleId', softDeleteArticleController.handle);

const multerThumbnail = multer(uploadConfig.multer).single('articleThumbnail');

articleRoutes.put(
  '/:articleId/thumbnail',
  multerThumbnail,
  updateArticleThumbnailController.handle,
);

export { articleRoutes };
