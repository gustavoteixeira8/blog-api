import { UserMapper } from '@modules/users/mappers/UserMapper';
import { ShowUserByIdUseCase } from './ShowUserByIdUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { HttpResponse, ok } from '@shared/core/http/HttpResponse';

export class ShowUserByIdController extends WebController {
  constructor(useCase: ShowUserByIdUseCase) {
    super(useCase);
  }

  public async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { userId } = httpRequest.userData;

    const user = await this._useCase.execute({ userId });

    const userFormatted = UserMapper.toHimself(user);

    return ok({ message: null, data: userFormatted });
  }
}
