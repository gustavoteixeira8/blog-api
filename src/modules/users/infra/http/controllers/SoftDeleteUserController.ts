import { SoftDeleteUserUseCase } from '@modules/users/useCases/SoftDeleteUserUseCase';
import { ok } from '@shared/infra/http/utils/httpResponses';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class SoftDeleteUserController {
  public async handle(req: Request, res: Response): Promise<Response | never> {
    const { userId } = req.userData;

    const deleteUser = container.resolve(SoftDeleteUserUseCase);

    await deleteUser.execute({ userId });

    return ok(res, { message: 'Your user will be deleted in 1 month' });
  }
}
