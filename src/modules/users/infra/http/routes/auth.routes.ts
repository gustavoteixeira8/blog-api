import { controllerAdapter } from '@shared/adapters/expressAdapter/controllerAdapter';
import { makeAuthenticateUserController } from '@shared/factories/controllers/makeAuthenticateUserController';
import { makeSendUpdatePasswordEmailController } from '@shared/factories/controllers/makeSendUpdatePasswordEmailController';
import { makeSendVerificationEmailController } from '@shared/factories/controllers/makeSendVerificationEmailController';
import { Router } from 'express';
import { updateUserPasswordController, verifyUserEmailController } from '../controllers';

export const setupAuthRoutes = () => {
  const authRoutes = Router();

  authRoutes.post('/', controllerAdapter(makeAuthenticateUserController()));

  authRoutes.post('/email/verify', controllerAdapter(makeSendVerificationEmailController()));
  authRoutes.put('/email/verify/:token', verifyUserEmailController.handle);

  authRoutes.post('/password/forgot', controllerAdapter(makeSendUpdatePasswordEmailController()));
  authRoutes.put('/password/recover/:token', updateUserPasswordController.handle);

  return authRoutes;
};
