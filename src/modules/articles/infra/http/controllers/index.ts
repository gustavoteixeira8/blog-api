import { CreateArticleController } from './CreateArticleController';
import { ShowPublicArticleByIdController } from './ShowPublicArticleByIdController';
import { SoftDeleteArticleController } from './SoftDeleteArticleController';
import { UpdateArticleController } from './UpdateArticleController';
import { UpdateArticleThumbnailController } from './UpdateArticleThumbnailController';
import { RecoverArticleController } from './RecoverArticleController';
import { SearchPublicArticlesController } from './SearchPublicArticlesController';

const createArticleController = new CreateArticleController();
const showPublicArticleByIdController = new ShowPublicArticleByIdController();
const updateArticleController = new UpdateArticleController();
const updateArticleThumbnailController = new UpdateArticleThumbnailController();
const softDeleteArticleController = new SoftDeleteArticleController();
const recoverArticleController = new RecoverArticleController();
const searchPublicArticlesController = new SearchPublicArticlesController();

export {
  createArticleController,
  showPublicArticleByIdController,
  updateArticleController,
  softDeleteArticleController,
  updateArticleThumbnailController,
  recoverArticleController,
  searchPublicArticlesController,
};
