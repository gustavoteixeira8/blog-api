import { CreateArticleController } from './CreateArticleController';
import { ShowAllPublicArticlesController } from './ShowAllPublicArticlesController';
import { ShowPublicArticleByIdController } from './ShowPublicArticleByIdController';
import { SoftDeleteArticleController } from './SoftDeleteArticleController';
import { UpdateArticleController } from './UpdateArticleController';
import { UpdateArticleThumbnailController } from './UpdateArticleThumbnailController';
import { RecoverArticleController } from './RecoverArticleController';
import { ShowAllPublicArticlesByCategoryController } from './ShowAllPublicArticlesByCategoryController';
import { ShowAllPublicArticlesByUserController } from './ShowAllPublicArticlesByUserController';

const createArticleController = new CreateArticleController();
const showPublicArticleByIdController = new ShowPublicArticleByIdController();
const updateArticleController = new UpdateArticleController();
const updateArticleThumbnailController = new UpdateArticleThumbnailController();
const softDeleteArticleController = new SoftDeleteArticleController();
const showAllPublicArticlesController = new ShowAllPublicArticlesController();
const recoverArticleController = new RecoverArticleController();
const showAllPublicArticlesByCategoryController = new ShowAllPublicArticlesByCategoryController();
const showAllPublicArticlesByUserController = new ShowAllPublicArticlesByUserController();

export {
  createArticleController,
  showPublicArticleByIdController,
  updateArticleController,
  softDeleteArticleController,
  showAllPublicArticlesController,
  updateArticleThumbnailController,
  recoverArticleController,
  showAllPublicArticlesByCategoryController,
  showAllPublicArticlesByUserController,
};
