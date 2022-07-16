import { SendUpdatePasswordEmailUseCase } from './SendUpdatePasswordEmailUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { badRequest, HttpResponse, ok } from '@shared/core/http/HttpResponse';
import { MissingParamError } from '@shared/core/errors';

export class SendUpdatePasswordEmailController extends WebController {
  constructor(useCase: SendUpdatePasswordEmailUseCase) {
    super(useCase);
  }
  public async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email } = httpRequest.body;

    const result = await this._useCase.execute({ email });

    if (this.isTypeofErrors(result, MissingParamError.name)) {
      return badRequest({ message: result.message });
    }

    return ok({
      message: 'If the email exists in the database and is not verified, you will receive an email',
      data: null,
    });
  }
}
