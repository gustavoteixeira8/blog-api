import { SendVerificationEmailUseCase } from '@modules/users/useCases/SendVerificationEmailUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { HttpResponse, ok } from '@shared/core/http/HttpResponse';

export class SendVerificationEmailController extends WebController {
  constructor(useCase: SendVerificationEmailUseCase) {
    super(useCase);
  }
  public async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email } = httpRequest.body;

    await this._useCase.execute({ email });

    return ok({
      message: 'If the email exists in the database and is not verified, you will receive an email',
      data: null,
    });
  }
}
