import { CreateUserUseCase } from './CreateUserUseCase';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { badRequest, HttpResponse, ok } from '@shared/core/http/HttpResponse';
import { WebController } from '@shared/core/controllers/WebController';
import {
  EmailAlreadyExistsError,
  InvalidEmailError,
  InvalidFullNameError,
  InvalidPasswordError,
  InvalidUsernameError,
  UsernameAlreadyExistsError,
} from '@shared/core/errors';

export class CreateUserController extends WebController<CreateUserUseCase> {
  public async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { fullName, email, password, username } = httpRequest.body;

    const createUserResponse = await this._useCase.execute({ fullName, email, password, username });
    const isBadRequest = this.isTypeofErrors(
      createUserResponse,
      InvalidEmailError.name,
      InvalidPasswordError.name,
      InvalidUsernameError.name,
      InvalidFullNameError.name,
      EmailAlreadyExistsError.name,
      UsernameAlreadyExistsError.name,
    );

    if (isBadRequest) {
      return badRequest({ message: createUserResponse.message });
    }

    return ok({ data: null, message: 'Your user was created successfully' });
  }
}
