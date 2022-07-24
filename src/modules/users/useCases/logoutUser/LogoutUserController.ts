import { WebController } from '@shared/core/controllers/WebController';
import { InvalidTokenError, MissingParamError } from '@shared/core/errors';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { badRequest, HttpResponse, ok, unauthorized } from '@shared/core/http/HttpResponse';
import { LogoutUserUseCase } from './LogoutUserUseCase';

export class LogoutUserController extends WebController<LogoutUserUseCase> {
  protected async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const authorization = httpRequest.headers.authorization;

    const [, accessToken] = authorization.split(' ');

    const result = await this._useCase.execute({ accessToken });

    if (this.isTypeofErrors(result, MissingParamError.name)) {
      return badRequest({ message: result.message });
    }

    if (this.isTypeofErrors(result, InvalidTokenError.name)) {
      return unauthorized({ message: result.message });
    }

    return ok({ message: 'Logged out successfully' });
  }
}
