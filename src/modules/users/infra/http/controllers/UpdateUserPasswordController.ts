import { UpdateUserPasswordUseCase } from '@modules/users/useCases/UpdateUserPasswordUseCase';
import { ok } from '@shared/infra/http/utils/httpResponses';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class UpdateUserPasswordController {
  public async handle(req: Request, res: Response): Promise<Response | never> {
    const { password, confirmPassword } = req.body;
    const { token } = req.params;

    const createUser = container.resolve(UpdateUserPasswordUseCase);

    await createUser.execute({ token, password, confirmPassword });

    return ok(res, { message: 'Your password was updated successfully' });
  }
}
