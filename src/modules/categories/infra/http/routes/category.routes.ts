import { ensureAuthentication } from '@shared/infra/http/middlewares/ensureAuthentication';
import { ensureUserIsAdmin } from '@shared/infra/http/middlewares/ensureUserIsAdmin';
import { Router } from 'express';
import {
  createCategoryController,
  deleteCategoryController,
  showAllCategoriesController,
  showCategoryByIdController,
  updateCategoryController,
} from '../controllers';
import { showAllPublicArticlesByCategoryController } from '@modules/articles/infra/http/controllers';

const categoryRoutes = Router();

categoryRoutes.get('/', showAllCategoriesController.handle);
categoryRoutes.get('/:categoryId', showCategoryByIdController.handle);
categoryRoutes.get('/:categoryId/article', showAllPublicArticlesByCategoryController.handle);

categoryRoutes.use(ensureAuthentication);
categoryRoutes.use(ensureUserIsAdmin);

categoryRoutes.post('/', createCategoryController.handle);
categoryRoutes.put('/:categoryId', updateCategoryController.handle);
categoryRoutes.delete('/:categoryId', deleteCategoryController.handle);

export { categoryRoutes };
