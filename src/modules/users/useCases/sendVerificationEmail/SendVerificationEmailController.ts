import { SendVerificationEmailUseCase } from './SendVerificationEmailUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { badRequest, HttpResponse, ok } from '@shared/core/http/HttpResponse';
import {
  MissingParamError,
  TokenMustBeSpecificTypeError,
  TokenMustExpiresInFutureError,
} from '@shared/core/errors';

export class SendVerificationEmailController extends WebController<SendVerificationEmailUseCase> {
  protected async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email } = httpRequest.body;

    const result = await this._useCase.execute({ email });
    const isBadRequest = this.isTypeofErrors(
      result,
      MissingParamError.name,
      TokenMustBeSpecificTypeError.name,
      TokenMustExpiresInFutureError.name,
    );

    if (isBadRequest) {
      return badRequest({ message: result.message });
    }

    return ok({
      message: 'If the email exists in the database and is not verified, you will receive an email',
      data: null,
    });
  }
}
