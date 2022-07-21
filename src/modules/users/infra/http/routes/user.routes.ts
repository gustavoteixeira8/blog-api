import { makeCreateUser } from '@modules/users/useCases/createUser/makeCreateUser';
import { makeAddRoleAdminToUser } from '@modules/users/useCases/makeUserAdmin/makeAddRoleAdminToUser';
import { makeRemoveUserAdmin } from '@modules/users/useCases/removeUserAdmin/makeRemoveUserAdmin';
import { makeSearchUsersController } from '@modules/users/useCases/searchUsers/makeSearchUsers';
import { makeShowUserById } from '@modules/users/useCases/showUserById/makeShowUserById';
import { makeShowUserByUsername } from '@modules/users/useCases/showUserByUsername/makeShowUserByUsername';
import { makeSoftDeleteUser } from '@modules/users/useCases/softDeleteUser/makeSoftDeleteUser';
import { makeUpdateUser } from '@modules/users/useCases/updateUser/makeUpdateUser';
import { controllerAdapter } from '@shared/adapters/expressAdapter/controllerAdapter';
import { middlewareAdapter } from '@shared/adapters/expressAdapter/middlewareAdapter';
import { makeEnsureAuthentication } from '@shared/infra/http/middlewares/ensureAuth/makeEnsureAuthentication';
import { Router } from 'express';
import { makeEnsureAdmin } from '@shared/infra/http/middlewares/ensureAdmin/makeEnsureAdmin';

export const setupUserRoutes = () => {
  const userRoutes = Router();

  userRoutes.use(middlewareAdapter(makeEnsureAuthentication()));

  userRoutes.post('/', middlewareAdapter(makeEnsureAdmin()), controllerAdapter(makeCreateUser()));

  userRoutes.put('/', controllerAdapter(makeUpdateUser()));
  userRoutes.delete('/', controllerAdapter(makeSoftDeleteUser()));
  userRoutes.get('/me', controllerAdapter(makeShowUserById()));
  userRoutes.get('/:username', controllerAdapter(makeShowUserByUsername()));

  userRoutes.use(middlewareAdapter(makeEnsureAdmin()));

  userRoutes.get('/', controllerAdapter(makeSearchUsersController()));
  userRoutes.put('/admin/add', controllerAdapter(makeAddRoleAdminToUser()));
  userRoutes.put('/admin/remove', controllerAdapter(makeRemoveUserAdmin()));

  return userRoutes;
};
