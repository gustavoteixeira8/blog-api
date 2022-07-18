import { ArticleMapper } from '@modules/articles/mappers/ArticleMapper';
import { ShowPublicArticleBySlugUseCase } from './ShowPublicArticleBySlugUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { badRequest, HttpResponse, notFound, ok } from '@shared/core/http/HttpResponse';
import { ArticleNotFoundError, MissingParamError } from '@shared/core/errors';

export class ShowPublicArticleBySlugController extends WebController<ShowPublicArticleBySlugUseCase> {
  protected async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { articleSlug } = httpRequest.params;

    const articleOrError = await this._useCase.execute({ articleSlug });

    if (this.isTypeofErrors(articleOrError, MissingParamError.name)) {
      return badRequest({ message: articleOrError.message });
    }

    if (this.isTypeofErrors(articleOrError, ArticleNotFoundError.name)) {
      return notFound({ message: articleOrError.message });
    }

    const articleFormatted = ArticleMapper.toDetails(articleOrError, true);

    return ok({ data: articleFormatted, message: null });
  }
}
