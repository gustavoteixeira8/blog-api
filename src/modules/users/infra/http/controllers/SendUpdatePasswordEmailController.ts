import { SendUpdatePasswordEmailUseCase } from '@modules/users/useCases/SendUpdatePasswordEmailUseCase';
import { ok } from '@shared/infra/http/utils/httpResponses';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class SendUpdatePasswordEmailController {
  public async handle(req: Request, res: Response): Promise<Response | never> {
    const { email } = req.body;

    const sendEmail = container.resolve(SendUpdatePasswordEmailUseCase);

    await sendEmail.execute({ email });

    return ok(res, {
      message: 'If the email exists in the database and is not verified, you will receive an email',
    });
  }
}
