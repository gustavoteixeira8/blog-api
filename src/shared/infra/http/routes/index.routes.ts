import { Router } from 'express';
import { setupUserRoutes } from '@modules/users/infra/http/routes/user.routes';
import { setupAuthRoutes } from '@modules/users/infra/http/routes/auth.routes';
import { setupCategoryRoutes } from '@modules/categories/infra/http/routes/category.routes';
import { setupArticleRoutes } from '@modules/articles/infra/http/routes/article.routes';
import { middlewareAdapter } from '@shared/adapters/expressAdapter/middlewareAdapter';
import { makeSanitizeBody } from '../middlewares/sanitizeBody/makeSanitizeBody';
import { catchErrorsInRoutes } from '../middlewares/catchErrorsInRoutes';
import {
  authRoutesLimiter,
  authRoutesSlowDown,
  defaultLimiter,
  defaultSlowDown,
} from '../middlewares/rateLimiter';

export const setupRoutes = () => {
  const routes = Router();

  const sanitizeBody = middlewareAdapter(makeSanitizeBody());

  routes
    .use('/user', defaultSlowDown, defaultLimiter, sanitizeBody, setupUserRoutes())
    .use('/auth', authRoutesSlowDown, authRoutesLimiter, sanitizeBody, setupAuthRoutes())
    .use('/category', defaultSlowDown, defaultLimiter, sanitizeBody, setupCategoryRoutes())
    .use('/article', defaultSlowDown, defaultLimiter, sanitizeBody, setupArticleRoutes())
    .use(catchErrorsInRoutes);

  return routes;
};
