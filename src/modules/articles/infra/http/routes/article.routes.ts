import multer from 'multer';
import { ensureAuthentication } from '@shared/infra/http/middlewares/ensureAuthentication';
import { ensureUserIsAdmin } from '@shared/infra/http/middlewares/ensureUserIsAdmin';
import { Router } from 'express';
import { uploadConfig } from '@config/upload';
import { controllerAdapter } from '@shared/adapters/expressAdapter/controllerAdapter';
import { makeSearchPublicArticles } from '@modules/articles/useCases/searchPublicArticles/makeSearchPublicArticles';
import { makeShowPublicArticleBySlug } from '@modules/articles/useCases/showPublicArticleBySlug/makeShowPublicArticleBySlug';
import { makeCreateArticle } from '@modules/articles/useCases/createArticle/makeCreateArticle';
import { makeUpdateArticle } from '@modules/articles/useCases/updateArticle/makeUpdateArticle';
import { makeRecoverArticle } from '@modules/articles/useCases/recoverArticle/makeRecoverArticle';
import { makeSoftDeleteArticle } from '@modules/articles/useCases/softDeleteArticle/makeSoftDeleteArticle';
import { makeUpdateArticleThumbnail } from '@modules/articles/useCases/updateArticleThumbnail/makeUpdateArticleThumbnail';

export const setupArticleRoutes = () => {
  const articleRoutes = Router();

  articleRoutes.get('/', controllerAdapter(makeSearchPublicArticles()));
  articleRoutes.get('/:articleSlug', controllerAdapter(makeShowPublicArticleBySlug()));

  articleRoutes.use(ensureAuthentication);
  articleRoutes.use(ensureUserIsAdmin);

  articleRoutes.post('/', controllerAdapter(makeCreateArticle()));
  articleRoutes.put('/:articleId', controllerAdapter(makeUpdateArticle()));
  articleRoutes.put('/:articleId/recover', controllerAdapter(makeRecoverArticle()));
  articleRoutes.delete('/:articleId', controllerAdapter(makeSoftDeleteArticle()));

  const multerThumbnail = multer(uploadConfig.multer).single('articleThumbnail');

  articleRoutes.put(
    '/:articleId/thumbnail',
    multerThumbnail,
    controllerAdapter(makeUpdateArticleThumbnail()),
  );

  return articleRoutes;
};
