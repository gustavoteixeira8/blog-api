import { Router } from 'express';
import { userRoutes } from '@modules/users/infra/http/routes/user.routes';
import { authRoutes } from '@modules/users/infra/http/routes/auth.routes';
import { categoryRoutes } from '@modules/categories/infra/http/routes/category.routes';
import { articleRoutes } from '@modules/articles/infra/http/routes/article.routes';
import { authRoutesLimiter, authRoutesSlowDown, defaultLimiter } from '../middlewares/rateLimiter';

const routes = Router();

routes
  .use('/user', defaultLimiter, userRoutes)
  .use('/auth', authRoutesSlowDown, authRoutesLimiter, authRoutes)
  .use('/category', defaultLimiter, categoryRoutes)
  .use('/article', defaultLimiter, articleRoutes);

export { routes };
