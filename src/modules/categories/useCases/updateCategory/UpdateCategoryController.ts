import { UpdateCategoryUseCase } from './UpdateCategoryUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpResponse, ok } from '@shared/core/http/HttpResponse';
import { HttpRequest } from '@shared/core/http/HttpRequest';

export class UpdateCategoryController extends WebController {
  constructor(useCase: UpdateCategoryUseCase) {
    super(useCase);
  }

  public async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name } = httpRequest.body;
    const { categoryId } = httpRequest.params;
    const { userId } = httpRequest.userData;

    await this._useCase.execute({ name, categoryId, userId });

    return ok({ data: null, message: 'Category was updated successfully' });
  }
}
