import { VerifyUserEmailUseCase } from './VerifyUserEmailUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { badRequest, forbidden, HttpResponse, notFound, ok } from '@shared/core/http/HttpResponse';
import { InvalidTokenError, MissingParamError, UserNotFoundError } from '@shared/core/errors';

export class VerifyUserEmailController extends WebController<VerifyUserEmailUseCase> {
  protected async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { token } = httpRequest.params;

    const result = await this._useCase.execute({ token });

    if (this.isTypeofErrors(result, MissingParamError.name)) {
      return badRequest({ message: result.message });
    }

    if (this.isTypeofErrors(result, UserNotFoundError.name)) {
      return notFound({ message: result.message });
    }

    if (this.isTypeofErrors(result, InvalidTokenError.name)) {
      return forbidden({ message: result.message });
    }

    return ok({ message: 'Your email was successfully verified', data: null });
  }
}
