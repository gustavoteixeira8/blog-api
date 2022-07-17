import { UpdateUserPasswordUseCase } from './UpdateUserPasswordUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { badRequest, forbidden, HttpResponse, notFound, ok } from '@shared/core/http/HttpResponse';
import {
  InvalidPasswordError,
  InvalidTokenError,
  MissingParamError,
  PasswordMustBeEqualConfirmPasswordError,
  UserEmailIsNotVerifiedError,
  UserNotFoundError,
} from '@shared/core/errors';

export class UpdateUserPasswordController extends WebController<UpdateUserPasswordUseCase> {
  protected async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { password, confirmPassword } = httpRequest.body;
    const { token } = httpRequest.params;

    const result = await this._useCase.execute({ token, password, confirmPassword });
    const isBadRequest = this.isTypeofErrors(
      result,
      InvalidPasswordError.name,
      MissingParamError.name,
      PasswordMustBeEqualConfirmPasswordError.name,
    );

    if (isBadRequest) {
      return badRequest({ message: result.message });
    }

    const isNotFound = this.isTypeofErrors(result, UserNotFoundError.name);

    if (isNotFound) {
      return notFound({ message: result.message });
    }

    const isForbidden = this.isTypeofErrors(
      result,
      UserEmailIsNotVerifiedError.name,
      InvalidTokenError.name,
    );

    if (isForbidden) {
      return forbidden({ message: result.message });
    }

    return ok({ message: 'Your password was updated successfully', data: null });
  }
}
