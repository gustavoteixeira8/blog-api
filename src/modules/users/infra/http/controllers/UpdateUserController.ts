import { UpdateUserUseCase } from '@modules/users/useCases/UpdateUserUseCase';
import { ok } from '@shared/infra/http/utils/httpResponses';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class UpdateUserController {
  public async handle(req: Request, res: Response): Promise<Response | never> {
    const { fullName, email, username } = req.body;
    const { userId } = req.userData;

    const updateUser = container.resolve(UpdateUserUseCase);

    await updateUser.execute({ userId, fullName, email, username });

    return ok(res, {
      message: 'User has been successfully updated',
    });
  }
}
