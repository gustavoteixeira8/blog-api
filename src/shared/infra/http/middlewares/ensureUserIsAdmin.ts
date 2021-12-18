import { UserRepositoryProtocol } from '@modules/users/repositories/UserRepositoryProtocol';
import { ForbiddenError } from '@shared/infra/http/errors/httpErrors';
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

export async function ensureUserIsAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { userId } = req.userData;
  const userRepository = container.resolve<UserRepositoryProtocol>('UserRepository');

  const user = await userRepository.findById(userId, { withDeleted: false });

  if (!user || !user.isAdmin || !user.isEmailVerified) {
    throw new ForbiddenError('You do not have access to this feature');
  }

  return next();
}
