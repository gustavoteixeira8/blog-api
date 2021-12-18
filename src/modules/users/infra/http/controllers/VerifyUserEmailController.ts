import { VerifyUserEmailUseCase } from '@modules/users/useCases/VerifyUserEmailUseCase';
import { ok } from '@shared/infra/http/utils/httpResponses';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class VerifyUserEmailController {
  public async handle(req: Request, res: Response): Promise<Response | never> {
    const { token } = req.params;

    const verifyEmail = container.resolve(VerifyUserEmailUseCase);

    await verifyEmail.execute({ token });

    return ok(res, {
      message: 'Your email was successfully verified',
    });
  }
}
