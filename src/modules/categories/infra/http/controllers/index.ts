import { CreateCategoryController } from './CreateCategoryController';
import { DeleteCategoryController } from './DeleteCategoryController';
import { ShowAllCategoriesController } from './ShowAllCategoriesController';
import { ShowCategoryBySlugController } from './ShowCategoryBySlugController';
import { UpdateCategoryController } from './UpdateCategoryController';

const createCategoryController = new CreateCategoryController();
const updateCategoryController = new UpdateCategoryController();
const deleteCategoryController = new DeleteCategoryController();
const showAllCategoriesController = new ShowAllCategoriesController();
const showCategoryBySlugController = new ShowCategoryBySlugController();

export {
  createCategoryController,
  updateCategoryController,
  showAllCategoriesController,
  deleteCategoryController,
  showCategoryBySlugController,
};
