import { UserDetailsDTO } from '@modules/users/dtos/UserDetailsDTO';
import { UserToHimself } from '@modules/users/dtos/UserToHimself';
import { UserMapper } from '@modules/users/mappers/UserMapper';
import { ShowUserByUsernameUseCase } from './ShowUserByUsernameUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { HttpResponse, ok } from '@shared/core/http/HttpResponse';

export class ShowUserByUsernameController extends WebController {
  constructor(useCase: ShowUserByUsernameUseCase) {
    super(useCase);
  }

  public async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { userId } = httpRequest.userData;
    const { username } = httpRequest.params;

    const user = await this._useCase.execute({ username });

    let userFormatted: UserToHimself | UserDetailsDTO;

    if (user.id.value === userId) {
      userFormatted = UserMapper.toHimself(user);
    } else {
      userFormatted = UserMapper.toDetails(user);
    }

    return ok({ message: null, data: userFormatted });
  }
}
