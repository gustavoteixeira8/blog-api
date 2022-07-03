import { Router } from 'express';
import { setupUserRoutes } from '@modules/users/infra/http/routes/user.routes';
import { setupAuthRoutes } from '@modules/users/infra/http/routes/auth.routes';
import { setupCategoryRoutes } from '@modules/categories/infra/http/routes/category.routes';
import { setupArticleRoutes } from '@modules/articles/infra/http/routes/article.routes';
import { sanitizeBody } from '../middlewares/sanitizeBody';

export const setupRoutes = () => {
  const routes = Router();

  routes
    .use('/user', sanitizeBody, setupUserRoutes())
    .use('/auth', sanitizeBody, setupAuthRoutes())
    .use('/category', sanitizeBody, setupCategoryRoutes())
    .use('/article', sanitizeBody, setupArticleRoutes());

  return routes;
};
