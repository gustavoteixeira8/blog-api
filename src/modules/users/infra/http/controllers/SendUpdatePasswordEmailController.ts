import { SendUpdatePasswordEmailUseCase } from '@modules/users/useCases/SendUpdatePasswordEmailUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { HttpResponse, ok } from '@shared/core/http/HttpResponse';

export class SendUpdatePasswordEmailController extends WebController {
  constructor(useCase: SendUpdatePasswordEmailUseCase) {
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
