import { makeAuthenticateUser } from '@modules/users/useCases/autheticateUser/makeAuthenticateUser';
import { makeSendUpdatePasswordEmail } from '@modules/users/useCases/sendUpdatePasswordEmail/makeSendUpdatePasswordEmail';
import { makeSendVerificationEmail } from '@modules/users/useCases/sendVerificationEmail/makeSendVerificationEmail';
import { makeUpdateUserPassword } from '@modules/users/useCases/updateUserPassword/makeUpdateUserPassword';
import { makeVerifyUserEmail } from '@modules/users/useCases/verifyUserEmail/makeVerifyUserEmail';
import { controllerAdapter } from '@shared/adapters/expressAdapter/controllerAdapter';
import { Router } from 'express';

export const setupAuthRoutes = () => {
  const authRoutes = Router();

  authRoutes.post('/', controllerAdapter(makeAuthenticateUser()));

  authRoutes.post('/email/verify', controllerAdapter(makeSendVerificationEmail()));
  authRoutes.put('/email/verify/:token', controllerAdapter(makeVerifyUserEmail()));

  authRoutes.post('/password/forgot', controllerAdapter(makeSendUpdatePasswordEmail()));
  authRoutes.put('/password/recover/:token', controllerAdapter(makeUpdateUserPassword()));

  return authRoutes;
};
