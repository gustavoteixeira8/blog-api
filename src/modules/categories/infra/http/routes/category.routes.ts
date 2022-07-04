import { makeCreateCategory } from '@modules/categories/useCases/createCategory/makeCreateCategory';
import { makeDeleteCategory } from '@modules/categories/useCases/deleteCategory/makeDeleteCategory';
import { makeShowAllCategories } from '@modules/categories/useCases/showAllCategories/makeShowAllCategories';
import { makeShowCategoryBySlug } from '@modules/categories/useCases/showCategoryBySlug/makeShowCategoryBySlug';
import { makeUpdateCategory } from '@modules/categories/useCases/updateCategory/makeUpdateCategory';
import { controllerAdapter } from '@shared/adapters/expressAdapter/controllerAdapter';
import { middlewareAdapter } from '@shared/adapters/expressAdapter/middlewareAdapter';
import { makeEnsureAdmin } from '@shared/infra/http/middlewares/ensureAdmin/makeEnsureAdmin';
import { makeEnsureAuthentication } from '@shared/infra/http/middlewares/ensureAuth/makeEnsureAuthentication';
import { Router } from 'express';

export const setupCategoryRoutes = () => {
  const categoryRoutes = Router();

  categoryRoutes.get('/', controllerAdapter(makeShowAllCategories()));
  categoryRoutes.get('/:categorySlug', controllerAdapter(makeShowCategoryBySlug()));

  categoryRoutes.use(middlewareAdapter(makeEnsureAuthentication()));
  categoryRoutes.use(middlewareAdapter(makeEnsureAdmin()));

  categoryRoutes.post('/', controllerAdapter(makeCreateCategory()));
  categoryRoutes.put('/:categoryId', controllerAdapter(makeUpdateCategory()));
  categoryRoutes.delete('/:categoryId', controllerAdapter(makeDeleteCategory()));

  return categoryRoutes;
};
