import { ensureAuthentication } from '@shared/infra/http/middlewares/ensureAuthentication';
import { ensureUserIsAdmin } from '@shared/infra/http/middlewares/ensureUserIsAdmin';
import { Router } from 'express';
import {
  createUserController,
  searchUsersController,
  makeUserAdminController,
  removeUserAdminController,
  showMeController,
  showUserByIdController,
  updateUserController,
  softDeleteUserController,
} from '../controllers';

const userRoutes = Router();

// Any user
userRoutes.post('/', createUserController.handle);

userRoutes.use(ensureAuthentication);

userRoutes.put('/', updateUserController.handle);
userRoutes.delete('/', softDeleteUserController.handle);
userRoutes.get('/me', showMeController.handle);
userRoutes.get('/:userId', showUserByIdController.handle);

userRoutes.use(ensureUserIsAdmin);

// Only admins
userRoutes.get('/', searchUsersController.handle);
userRoutes.put('/admin/add', makeUserAdminController.handle);
userRoutes.put('/admin/remove', removeUserAdminController.handle);

export { userRoutes };
