import { ArticleMapper } from '@modules/articles/mappers/ArticleMapper';
import { ShowArticleForCreatorUseCase } from './ShowArticleForCreatorUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { HttpResponse, ok } from '@shared/core/http/HttpResponse';

export class ShowArticleForCreatorController extends WebController {
  constructor(useCase: ShowArticleForCreatorUseCase) {
    super(useCase);
  }

  public async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { userId } = httpRequest.userData;
    const { articleSlug } = httpRequest.params;

    const article = await this._useCase.execute({ articleSlug, userId });

    const articleFormatted = ArticleMapper.toDetails(article, true);

    return ok({ message: null, data: articleFormatted });
  }
}
