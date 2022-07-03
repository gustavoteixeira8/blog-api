import { ArticleMapper } from '@modules/articles/mappers/ArticleMapper';
import { ShowPublicArticleBySlugUseCase } from './ShowPublicArticleBySlugUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { HttpResponse, ok } from '@shared/core/http/HttpResponse';

export class ShowPublicArticleBySlugController extends WebController {
  constructor(useCase: ShowPublicArticleBySlugUseCase) {
    super(useCase);
  }

  public async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { articleSlug } = httpRequest.params;

    const article = await this._useCase.execute({ articleSlug });

    const articleFormatted = ArticleMapper.toDetails(article, true);

    return ok({ data: articleFormatted, message: null });
  }
}
