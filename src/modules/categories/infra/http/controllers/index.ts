import { CreateCategoryController } from './CreateCategoryController';
import { DeleteCategoryController } from './DeleteCategoryController';
import { ShowAllCategoriesController } from './ShowAllCategoriesController';
import { ShowCategoryByIdController } from './ShowCategoryByIdController';
import { UpdateCategoryController } from './UpdateCategoryController';

const createCategoryController = new CreateCategoryController();
const updateCategoryController = new UpdateCategoryController();
const deleteCategoryController = new DeleteCategoryController();
const showAllCategoriesController = new ShowAllCategoriesController();
const showCategoryByIdController = new ShowCategoryByIdController();

export {
  createCategoryController,
  updateCategoryController,
  showAllCategoriesController,
  deleteCategoryController,
  showCategoryByIdController,
};
