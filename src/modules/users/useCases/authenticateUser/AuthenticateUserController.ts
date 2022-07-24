import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { badRequest, HttpResponse, unauthorized } from '@shared/core/http/HttpResponse';
import { WebController } from '@shared/core/controllers/WebController';
import { ok } from '@shared/core/http/HttpResponse';
import { LoginOrPasswordInvalidError, MissingParamError } from '@shared/core/errors';

export class AuthenticateUserController extends WebController<AuthenticateUserUseCase> {
  protected async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { login, password } = httpRequest.body;

    const authResponse = await this._useCase.execute({
      login,
      password,
    });
    const isUnauthorized = this.isTypeofErrors(authResponse, LoginOrPasswordInvalidError.name);

    if (isUnauthorized) {
      return unauthorized({ message: authResponse.message });
    }

    const isBadRequest = this.isTypeofErrors(authResponse, MissingParamError.name);

    if (isBadRequest) {
      return badRequest({ message: authResponse.message });
    }

    const { userIsRecovered, accessToken, expiresIn, userId } = authResponse;

    return ok({
      message: userIsRecovered ? 'Your user was successfully recovered' : null,
      data: {
        accessToken,
        expiresIn,
        userId,
      },
    });
  }
}
