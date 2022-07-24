import { makeAuthenticateUser } from '@modules/users/useCases/authenticateUser/makeAuthenticateUser';
import { makeLogoutUser } from '@modules/users/useCases/logoutUser/makeLogoutUser';
import { makeSendUpdatePasswordEmail } from '@modules/users/useCases/sendUpdatePasswordEmail/makeSendUpdatePasswordEmail';
import { makeSendVerificationEmail } from '@modules/users/useCases/sendVerificationEmail/makeSendVerificationEmail';
import { makeUpdateUserPassword } from '@modules/users/useCases/updateUserPassword/makeUpdateUserPassword';
import { makeVerifyUserEmail } from '@modules/users/useCases/verifyUserEmail/makeVerifyUserEmail';
import { controllerAdapter } from '@shared/adapters/expressAdapter/controllerAdapter';
import { middlewareAdapter } from '@shared/adapters/expressAdapter/middlewareAdapter';
import { makeEnsureAuthentication } from '@shared/infra/http/middlewares/ensureAuth/makeEnsureAuthentication';
import { Router } from 'express';

export const setupAuthRoutes = () => {
  const authRoutes = Router();

  authRoutes.post('/login', controllerAdapter(makeAuthenticateUser()));
  authRoutes.post(
    '/logout',
    middlewareAdapter(makeEnsureAuthentication()),
    controllerAdapter(makeLogoutUser()),
  );

  authRoutes.post('/email/verify', controllerAdapter(makeSendVerificationEmail()));
  authRoutes.put('/email/verify/:token', controllerAdapter(makeVerifyUserEmail()));

  authRoutes.post('/password/forgot', controllerAdapter(makeSendUpdatePasswordEmail()));
  authRoutes.put('/password/recover/:token', controllerAdapter(makeUpdateUserPassword()));

  return authRoutes;
};
