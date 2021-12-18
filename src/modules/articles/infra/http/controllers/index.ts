import { CreateArticleController } from './CreateArticleController';
import { SearchArticlesForUserCreatorController } from './SearchArticlesForCreatorController';
import { SearchPublicArticlesController } from './SearchPublicArticlesController';
import { ShowPublicArticleByIdController } from './ShowPublicArticleByIdController';
import { SoftDeleteArticleController } from './SoftDeleteArticleController';
import { UpdateArticleController } from './UpdateArticleController';
import { UpdateArticleThumbnailController } from './UpdateArticleThumbnailController';
import { RecoverArticleController } from './RecoverArticleController';
import { ShowArticleForUserCreatorController } from './ShowArticleForUserCreatorController';

const createArticleController = new CreateArticleController();
const showPublicArticleByIdController = new ShowPublicArticleByIdController();
const updateArticleController = new UpdateArticleController();
const updateArticleThumbnailController = new UpdateArticleThumbnailController();
const softDeleteArticleController = new SoftDeleteArticleController();
const searchPublicArticlesController = new SearchPublicArticlesController();
const searchArticlesForUserCreatorController = new SearchArticlesForUserCreatorController();
const recoverArticleController = new RecoverArticleController();
const showArticleForUserCreatorController = new ShowArticleForUserCreatorController();

export {
  createArticleController,
  showPublicArticleByIdController,
  updateArticleController,
  softDeleteArticleController,
  searchPublicArticlesController,
  updateArticleThumbnailController,
  searchArticlesForUserCreatorController,
  recoverArticleController,
  showArticleForUserCreatorController,
};
