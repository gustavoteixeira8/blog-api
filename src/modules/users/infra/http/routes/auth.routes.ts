import { Router } from 'express';
import {
  authenticateUserController,
  sendUpdatePasswordEmailController,
  sendVerificationEmailController,
  updateUserPasswordController,
  verifyUserEmailController,
} from '../controllers';

const authRoutes = Router();

authRoutes.post('/', authenticateUserController.handle);

authRoutes.post('/email/verify', sendVerificationEmailController.handle);
authRoutes.put('/email/verify/:token', verifyUserEmailController.handle);

authRoutes.post('/password/forgot', sendUpdatePasswordEmailController.handle);
authRoutes.put('/password/recover/:token', updateUserPasswordController.handle);

export { authRoutes };
