import { UpdateUserPasswordUseCase } from './UpdateUserPasswordUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { HttpResponse, ok } from '@shared/core/http/HttpResponse';

export class UpdateUserPasswordController extends WebController {
  constructor(useCase: UpdateUserPasswordUseCase) {
    super(useCase);
  }

  public async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { password, confirmPassword } = httpRequest.body;
    const { token } = httpRequest.params;

    await this._useCase.execute({ token, password, confirmPassword });

    return ok({ message: 'Your password was updated successfully', data: null });
  }
}
