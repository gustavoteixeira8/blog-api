import { ensureAuthentication } from '@shared/infra/http/middlewares/ensureAuthentication';
import { ensureUserIsAdmin } from '@shared/infra/http/middlewares/ensureUserIsAdmin';
import { Router } from 'express';
import {
  createCategoryController,
  deleteCategoryController,
  showAllCategoriesController,
  showCategoryBySlugController,
  updateCategoryController,
} from '../controllers';

const categoryRoutes = Router();

categoryRoutes.get('/', showAllCategoriesController.handle);
categoryRoutes.get('/:categorySlug', showCategoryBySlugController.handle);

categoryRoutes.use(ensureAuthentication);
categoryRoutes.use(ensureUserIsAdmin);

categoryRoutes.post('/', createCategoryController.handle);
categoryRoutes.put('/:categoryId', updateCategoryController.handle);
categoryRoutes.delete('/:categoryId', deleteCategoryController.handle);

export { categoryRoutes };
