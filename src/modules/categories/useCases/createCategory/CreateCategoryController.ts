import { CreateCategoryUseCase } from './CreateCategoryUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { created, HttpResponse } from '@shared/core/http/HttpResponse';

export class CreateCategoryController extends WebController {
  constructor(useCase: CreateCategoryUseCase) {
    super(useCase);
  }

  public async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name } = httpRequest.body;
    const { userId } = httpRequest.userData;

    await this._useCase.execute({ name, userId });

    return created({ message: 'Category was successfully created', data: null });
  }
}
