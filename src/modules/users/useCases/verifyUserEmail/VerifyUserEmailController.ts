import { VerifyUserEmailUseCase } from './VerifyUserEmailUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { HttpResponse, ok } from '@shared/core/http/HttpResponse';

export class VerifyUserEmailController extends WebController {
  constructor(useCase: VerifyUserEmailUseCase) {
    super(useCase);
  }

  public async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { token } = httpRequest.params;

    await this._useCase.execute({ token });

    return ok({ message: 'Your email was successfully verified', data: null });
  }
}
