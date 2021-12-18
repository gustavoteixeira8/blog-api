import { CreateUserUseCase } from '@modules/users/useCases/CreateUserUseCase';
import { created } from '@shared/infra/http/utils/httpResponses';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreateUserController {
  public async handle(req: Request, res: Response): Promise<Response | never> {
    const { fullName, email, password, username } = req.body;

    const createUser = container.resolve(CreateUserUseCase);

    await createUser.execute({ fullName, email, password, username });

    return created(res, { message: 'Your account has been successfully created' });
  }
}
