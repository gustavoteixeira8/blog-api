import multer from 'multer';
import { Router } from 'express';
import { uploadConfig } from '@config/upload';
import { controllerAdapter } from '@shared/adapters/expressAdapter/controllerAdapter';
import { makeSearchPublicArticles } from '@modules/articles/useCases/searchArticles/makeSearchPublicArticles';
import { makeCreateArticle } from '@modules/articles/useCases/createArticle/makeCreateArticle';
import { makeUpdateArticle } from '@modules/articles/useCases/updateArticle/makeUpdateArticle';
import { makeRecoverArticle } from '@modules/articles/useCases/recoverArticle/makeRecoverArticle';
import { makeSoftDeleteArticle } from '@modules/articles/useCases/softDeleteArticle/makeSoftDeleteArticle';
import { makeUpdateArticleThumbnail } from '@modules/articles/useCases/updateArticleThumbnail/makeUpdateArticleThumbnail';
import { middlewareAdapter } from '@shared/adapters/expressAdapter/middlewareAdapter';
import { makeEnsureAuthentication } from '@shared/infra/http/middlewares/ensureAuth/makeEnsureAuthentication';
import { makeEnsureAdmin } from '@shared/infra/http/middlewares/ensureAdmin/makeEnsureAdmin';
import { makeShowArticleBySlug } from '@modules/articles/useCases/showArticleBySlug/makeShowArticleBySlug';
import { makeChooseToCallAuthMiddleware } from '@shared/infra/http/middlewares/chooseToCallAuthMiddleware/makeChooseToCallAuthMiddleware';
import { makeSearchMyArticles } from '@modules/articles/useCases/searchMyArticles/makeSearchPublicArticles';

export const setupArticleRoutes = () => {
  const articleRoutes = Router();

  articleRoutes.get('/', controllerAdapter(makeSearchPublicArticles()));
  articleRoutes.get(
    '/:articleSlug',
    middlewareAdapter(makeChooseToCallAuthMiddleware()),
    controllerAdapter(makeShowArticleBySlug()),
  );

  articleRoutes.use(middlewareAdapter(makeEnsureAuthentication()));
  articleRoutes.use(middlewareAdapter(makeEnsureAdmin()));

  articleRoutes.get('/my/articles', controllerAdapter(makeSearchMyArticles()));
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
