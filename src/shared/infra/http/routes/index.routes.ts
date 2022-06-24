import { Router } from 'express';
import { userRoutes } from '@modules/users/infra/http/routes/user.routes';
import { setupAuthRoutes } from '@modules/users/infra/http/routes/auth.routes';
import { categoryRoutes } from '@modules/categories/infra/http/routes/category.routes';
import { articleRoutes } from '@modules/articles/infra/http/routes/article.routes';
import { authRoutesLimiter, authRoutesSlowDown, defaultLimiter } from '../middlewares/rateLimiter';
import { sanitizeBody } from '../middlewares/sanitizeBody';

export const setupRoutes = () => {
  const routes = Router();

  routes
    .use('/user', sanitizeBody, defaultLimiter, userRoutes())
    .use('/auth', sanitizeBody, authRoutesSlowDown, authRoutesLimiter, setupAuthRoutes())
    .use('/category', sanitizeBody, defaultLimiter, categoryRoutes)
    .use('/article', sanitizeBody, defaultLimiter, articleRoutes);

  return routes;
};
