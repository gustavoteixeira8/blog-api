import { makeCreateUser } from '@modules/users/useCases/createUser/makeCreateUser';
import { makeMakeUserAdmin } from '@modules/users/useCases/makeUserAdmin/makeMakeUserAdmin';
import { makeRemoveUserAdmin } from '@modules/users/useCases/removeUserAdmin/makeRemoveUserAdmin';
import { makeSearchArticlesForUserCreator } from '@modules/users/useCases/searchArticleForUserCreator/makeSearchArticlesForUserCreator';
import { makeSearchUsersController } from '@modules/users/useCases/searchUsers/makeSearchUsers';
import { makeShowArticleForCreator } from '@modules/users/useCases/showArticleForCreator/makeShowArticleForCreator';
import { makeShowUserById } from '@modules/users/useCases/showUserById/makeShowUserById';
import { makeShowUserByUsername } from '@modules/users/useCases/showUserByUsername/makeShowUserByUsername';
import { makeSoftDeleteUser } from '@modules/users/useCases/softDeleteUser/makeSoftDeleteUser';
import { makeUpdateUser } from '@modules/users/useCases/updateUser/makeUpdateUser';
import { controllerAdapter } from '@shared/adapters/expressAdapter/controllerAdapter';
import { ensureAuthentication } from '@shared/infra/http/middlewares/ensureAuthentication';
import { ensureUserIsAdmin } from '@shared/infra/http/middlewares/ensureUserIsAdmin';
import { Router } from 'express';

export const setupUserRoutes = () => {
  const userRoutes = Router();

  userRoutes.use(ensureAuthentication);

  userRoutes.post('/', ensureUserIsAdmin, controllerAdapter(makeCreateUser()));

  userRoutes.put('/', controllerAdapter(makeUpdateUser()));
  userRoutes.delete('/', controllerAdapter(makeSoftDeleteUser()));
  userRoutes.get('/me', controllerAdapter(makeShowUserById()));
  userRoutes.get('/:username', controllerAdapter(makeShowUserByUsername()));

  userRoutes.use(ensureUserIsAdmin);

  userRoutes.get('/', controllerAdapter(makeSearchUsersController()));
  userRoutes.get('/me/article', controllerAdapter(makeSearchArticlesForUserCreator()));
  userRoutes.get('/me/article/:articleSlug', controllerAdapter(makeShowArticleForCreator()));
  userRoutes.put('/admin/add', controllerAdapter(makeMakeUserAdmin()));
  userRoutes.put('/admin/remove', controllerAdapter(makeRemoveUserAdmin()));

  return userRoutes;
};
