import { RemoveUserAdminUseCase } from '@modules/users/useCases/RemoveUserAdminUseCase';
import { ok } from '@shared/infra/http/utils/httpResponses';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class RemoveUserAdminController {
  public async handle(req: Request, res: Response): Promise<Response | never> {
    const { userId } = req.body;
    const { userId: adminId } = req.userData;

    const makeAdmin = container.resolve(RemoveUserAdminUseCase);

    await makeAdmin.execute({ adminId, userId });

    return ok(res, { message: 'You have removed a user from admin successfully' });
  }
}
