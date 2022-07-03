import { UpdateArticleUseCase } from './UpdateArticleUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpResponse, ok } from '@shared/core/http/HttpResponse';
import { HttpRequest } from '@shared/core/http/HttpRequest';

export class UpdateArticleController extends WebController {
  constructor(useCase: UpdateArticleUseCase) {
    super(useCase);
  }

  public async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { title, text, isPublic, categoriesId } = httpRequest.body;
    const { articleId } = httpRequest.params;
    const { userId } = httpRequest.userData;

    await this._useCase.execute({
      title,
      text,
      isPublic,
      categoriesId,
      userId,
      articleId,
    });

    return ok({ data: null, message: 'Your article was updated successfully' });
  }
}
