import { Router } from 'express';
import { userRoutes } from '@modules/users/infra/http/routes/user.routes';
import { setupAuthRoutes } from '@modules/users/infra/http/routes/auth.routes';
import { setupCategoryRoutes } from '@modules/categories/infra/http/routes/category.routes';
import { articleRoutes } from '@modules/articles/infra/http/routes/article.routes';
import { sanitizeBody } from '../middlewares/sanitizeBody';

export const setupRoutes = () => {
  const routes = Router();

  routes
    .use('/user', sanitizeBody, userRoutes())
    .use('/auth', sanitizeBody, setupAuthRoutes())
    .use('/category', sanitizeBody, setupCategoryRoutes())
    .use('/article', sanitizeBody, articleRoutes);

  return routes;
};
