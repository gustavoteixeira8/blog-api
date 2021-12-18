import { UserMapper } from '@modules/users/mappers/UserMapper';
import { ShowUserByIdUseCase } from '@modules/users/useCases/ShowUserByIdUseCase';
import { ok } from '@shared/infra/http/utils/httpResponses';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ShowUserByIdController {
  public async handle(req: Request, res: Response): Promise<Response | never> {
    const { userId } = req.params;

    const showUser = container.resolve(ShowUserByIdUseCase);

    const user = await showUser.execute({ userId });

    const userDetails = UserMapper.toDetails(user);

    return ok(res, { user: userDetails });
  }
}
