import { SoftDeleteUserUseCase } from './SoftDeleteUserUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { HttpResponse, ok } from '@shared/core/http/HttpResponse';

export class SoftDeleteUserController extends WebController {
  constructor(useCase: SoftDeleteUserUseCase) {
    super(useCase);
  }

  public async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { userId } = httpRequest.userData;

    await this._useCase.execute({ userId });

    return ok({ message: 'Your user will be deleted in 1 month', data: null });
  }
}
