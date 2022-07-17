import { UpdateUserUseCase } from './UpdateUserUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { badRequest, forbidden, HttpResponse, notFound, ok } from '@shared/core/http/HttpResponse';
import {
  EmailAlreadyExistsError,
  InvalidEmailError,
  InvalidFullNameError,
  InvalidUsernameError,
  MissingParamError,
  UserEmailIsNotVerifiedError,
  UsernameAlreadyExistsError,
  UserNotFoundError,
} from '@shared/core/errors';

export class UpdateUserController extends WebController<UpdateUserUseCase> {
  protected async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { fullName, email, username } = httpRequest.body;
    const { userId } = httpRequest.userData;

    const result = await this._useCase.execute({ userId, fullName, email, username });

    const isBadRequest = this.isTypeofErrors(
      result,
      MissingParamError.name,
      InvalidUsernameError.name,
      InvalidFullNameError.name,
      InvalidEmailError.name,
      UsernameAlreadyExistsError.name,
      EmailAlreadyExistsError.name,
    );

    if (isBadRequest) {
      return badRequest({ message: result.message });
    }

    if (this.isTypeofErrors(result, UserNotFoundError.name)) {
      return notFound({ message: result.message });
    }

    if (this.isTypeofErrors(result, UserEmailIsNotVerifiedError.name)) {
      return forbidden({ message: result.message });
    }

    return ok({ data: null, message: 'Your user was updated successfully' });
  }
}
