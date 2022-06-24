import { CreateUserUseCase } from '@modules/users/useCases/CreateUserUseCase';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { HttpResponse, ok } from '@shared/core/http/HttpResponse';
import { WebController } from '@shared/core/controllers/WebController';

export class CreateUserController extends WebController {
  constructor(useCase: CreateUserUseCase) {
    super(useCase);
  }

  public async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { fullName, email, password, username } = httpRequest.body;

    await this._useCase.execute({ fullName, email, password, username });

    return ok({ data: null, message: 'Your user was created successfully' });
  }
}
