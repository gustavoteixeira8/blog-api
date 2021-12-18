import { MakeUserAdminUseCase } from '@modules/users/useCases/MakeUserAdminUseCase';
import { ok } from '@shared/infra/http/utils/httpResponses';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class MakeUserAdminController {
  public async handle(req: Request, res: Response): Promise<Response | never> {
    const { userId } = req.body;
    const { userId: adminId } = req.userData;

    const makeAdmin = container.resolve(MakeUserAdminUseCase);

    await makeAdmin.execute({ adminId, userId });

    return ok(res, { message: 'You have given admin permission to a new user successfully' });
  }
}
