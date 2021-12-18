import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import { JsonWebTokenProvider } from '@shared/providers/tokenProvider/implementations/JsonWebTokenProvider';
import { UnauthorizedError } from '@shared/infra/http/errors/httpErrors';

export function ensureAuthentication(req: Request, res: Response, next: NextFunction): void {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new UnauthorizedError('Authorization must me provided');
  }

  const [, tokenJWT] = authorization.split(' ');

  if (!tokenJWT) {
    throw new UnauthorizedError('Invalid token');
  }

  const tokenProvider = container.resolve(JsonWebTokenProvider);

  try {
    const { id } = tokenProvider.verify(tokenJWT);

    req.userData = { userId: id };
  } catch (err) {
    throw new UnauthorizedError('Invalid token');
  }

  return next();
}
