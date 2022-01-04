import { UserDetailsDTO } from '@modules/users/dtos/UserDetailsDTO';
import { UserToHimself } from '@modules/users/dtos/UserToHimself';
import { UserMapper } from '@modules/users/mappers/UserMapper';
import { ShowUserByUsernameUseCase } from '@modules/users/useCases/ShowUserByUsernameUseCase';
import { ok } from '@shared/infra/http/utils/httpResponses';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ShowUserByUsernameController {
  public async handle(req: Request, res: Response): Promise<Response | never> {
    const { userId } = req.userData;
    const { username } = req.params;

    const showUser = container.resolve(ShowUserByUsernameUseCase);

    const user = await showUser.execute({ username });

    let userFormatted: UserToHimself | UserDetailsDTO;

    if (user.id.value === userId) {
      userFormatted = UserMapper.toHimself(user);
    } else {
      userFormatted = UserMapper.toDetails(user);
    }

    return ok(res, { user: userFormatted });
  }
}
