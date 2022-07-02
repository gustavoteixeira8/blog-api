import { makeCreateCategory } from '@modules/categories/useCases/createCategory/makeCreateCategory';
import { makeDeleteCategory } from '@modules/categories/useCases/deleteCategory/makeDeleteCategory';
import { makeShowAllCategories } from '@modules/categories/useCases/showAllCategories/makeShowAllCategories';
import { makeShowCategoryBySlug } from '@modules/categories/useCases/showCategoryBySlug/makeShowCategoryBySlug';
import { makeUpdateCategory } from '@modules/categories/useCases/updateCategory/makeUpdateCategory';
import { controllerAdapter } from '@shared/adapters/expressAdapter/controllerAdapter';
import { ensureAuthentication } from '@shared/infra/http/middlewares/ensureAuthentication';
import { ensureUserIsAdmin } from '@shared/infra/http/middlewares/ensureUserIsAdmin';
import { Router } from 'express';

const categoryRoutes = Router();

categoryRoutes.get('/', controllerAdapter(makeShowAllCategories()));
categoryRoutes.get('/:categorySlug', controllerAdapter(makeShowCategoryBySlug()));

categoryRoutes.use(ensureAuthentication);
categoryRoutes.use(ensureUserIsAdmin);

categoryRoutes.post('/', controllerAdapter(makeCreateCategory()));
categoryRoutes.put('/:categoryId', controllerAdapter(makeUpdateCategory()));
categoryRoutes.delete('/:categoryId', controllerAdapter(makeDeleteCategory()));

export { categoryRoutes };
