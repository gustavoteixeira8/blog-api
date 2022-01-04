import { CreateArticleController } from './CreateArticleController';
import { ShowPublicArticleBySlugController } from './ShowPublicArticleBySlugController';
import { SoftDeleteArticleController } from './SoftDeleteArticleController';
import { UpdateArticleController } from './UpdateArticleController';
import { UpdateArticleThumbnailController } from './UpdateArticleThumbnailController';
import { RecoverArticleController } from './RecoverArticleController';
import { SearchPublicArticlesController } from './SearchPublicArticlesController';

const createArticleController = new CreateArticleController();
const showPublicArticleBySlugController = new ShowPublicArticleBySlugController();
const updateArticleController = new UpdateArticleController();
const updateArticleThumbnailController = new UpdateArticleThumbnailController();
const softDeleteArticleController = new SoftDeleteArticleController();
const recoverArticleController = new RecoverArticleController();
const searchPublicArticlesController = new SearchPublicArticlesController();

export {
  createArticleController,
  showPublicArticleBySlugController,
  updateArticleController,
  softDeleteArticleController,
  updateArticleThumbnailController,
  recoverArticleController,
  searchPublicArticlesController,
};
