import { UpdateUserUseCase } from './UpdateUserUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { HttpResponse, ok } from '@shared/core/http/HttpResponse';

export class UpdateUserController extends WebController {
  constructor(useCase: UpdateUserUseCase) {
    super(useCase);
  }

  public async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { fullName, email, username } = httpRequest.body;
    const { userId } = httpRequest.userData;

    await this._useCase.execute({ userId, fullName, email, username });

    return ok({ data: null, message: 'Your user was updated successfully' });
  }
}
