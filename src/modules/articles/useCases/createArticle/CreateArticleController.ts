import { WebController } from '@shared/core/controllers/WebController';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { created, HttpResponse } from '@shared/core/http/HttpResponse';
import { CreateArticleUseCase } from './CreateArticleUseCase';

export class CreateArticleController extends WebController {
  constructor(useCase: CreateArticleUseCase) {
    super(useCase);
  }

  public async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { title, text, isPublic, categoriesId } = httpRequest.body;
    const { userId } = httpRequest.userData;

    await this._useCase.execute({ title, text, isPublic, categoriesId, userId });

    return created({ data: null, message: 'Your article was created successfully' });
  }
}
