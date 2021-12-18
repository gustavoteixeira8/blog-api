import { AuthenticateUserUseCase } from '@modules/users/useCases/AuthenticateUserUseCase';
import { ok } from '@shared/infra/http/utils/httpResponses';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class AuthenticateUserController {
  public async handle(req: Request, res: Response): Promise<Response | never> {
    const { login, password } = req.body;

    const authUser = container.resolve(AuthenticateUserUseCase);

    const { accessToken, expiresIn, userId, userIsRecovered } = await authUser.execute({
      login,
      password,
    });

    return ok(res, {
      ...(userIsRecovered ? { message: 'Your account has been successfully restored' } : null),
      accessToken,
      expiresIn,
      userId,
    });
  }
}
