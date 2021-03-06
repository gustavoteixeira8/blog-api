import { ensureAuthentication } from '@shared/infra/http/middlewares/ensureAuthentication';
import { ensureUserIsAdmin } from '@shared/infra/http/middlewares/ensureUserIsAdmin';
import { Router } from 'express';
import {
  createUserController,
  searchUsersController,
  makeUserAdminController,
  removeUserAdminController,
  showUserByUsernameController,
  updateUserController,
  softDeleteUserController,
  searchArticlesForUserCreatorController,
  showUserByIdController,
  showArticleForCreatorController,
} from '../controllers';

const userRoutes = Router();

userRoutes.use(ensureAuthentication);

userRoutes.post('/', ensureUserIsAdmin, createUserController.handle);

userRoutes.put('/', updateUserController.handle);
userRoutes.delete('/', softDeleteUserController.handle);
userRoutes.get('/me', showUserByIdController.handle);
userRoutes.get('/:username', showUserByUsernameController.handle);

userRoutes.use(ensureUserIsAdmin);

userRoutes.get('/', searchUsersController.handle);
userRoutes.get('/me/article', searchArticlesForUserCreatorController.handle);
userRoutes.get('/me/article/:articleSlug', showArticleForCreatorController.handle);
userRoutes.put('/admin/add', makeUserAdminController.handle);
userRoutes.put('/admin/remove', removeUserAdminController.handle);

export { userRoutes };
