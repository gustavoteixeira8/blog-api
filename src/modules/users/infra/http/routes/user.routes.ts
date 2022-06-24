import { controllerAdapter } from '@shared/adapters/expressAdapter/controllerAdapter';
import { makeCreateUserController } from '@shared/factories/controllers/makeCreateUserController';
import { makeMakeUserAdminController } from '@shared/factories/controllers/makeMakeUserAdminController';
import { makeRemoveUserAdminController } from '@shared/factories/controllers/makeRemoveUserAdminController';
import { makeSearchArticlesForUserCreatorController } from '@shared/factories/controllers/makeSearchArticlesForUserCreatorController';
import { makeSearchUsersController } from '@shared/factories/controllers/makeSearchUsersController';
import { makeShowArticleForCreatorController } from '@shared/factories/controllers/makeShowArticleForCreatorController';
import { ensureAuthentication } from '@shared/infra/http/middlewares/ensureAuthentication';
import { ensureUserIsAdmin } from '@shared/infra/http/middlewares/ensureUserIsAdmin';
import { Router } from 'express';
import {
  showUserByUsernameController,
  updateUserController,
  softDeleteUserController,
  showUserByIdController,
} from '../controllers';

const userRoutes = () => {
  const userRoutes = Router();

  userRoutes.use(ensureAuthentication);

  userRoutes.post('/', ensureUserIsAdmin, controllerAdapter(makeCreateUserController()));

  userRoutes.put('/', updateUserController.handle);
  userRoutes.delete('/', softDeleteUserController.handle);
  userRoutes.get('/me', showUserByIdController.handle);
  userRoutes.get('/:username', showUserByUsernameController.handle);

  userRoutes.use(ensureUserIsAdmin);

  userRoutes.get('/', controllerAdapter(makeSearchUsersController()));
  userRoutes.get('/me/article', controllerAdapter(makeSearchArticlesForUserCreatorController()));
  userRoutes.get(
    '/me/article/:articleSlug',
    controllerAdapter(makeShowArticleForCreatorController()),
  );
  userRoutes.put('/admin/add', controllerAdapter(makeMakeUserAdminController()));
  userRoutes.put('/admin/remove', controllerAdapter(makeRemoveUserAdminController()));

  return userRoutes;
};

export { userRoutes };
