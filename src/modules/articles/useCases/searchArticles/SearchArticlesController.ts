import { ArticleMapper } from '@modules/articles/mappers/ArticleMapper';
import { SearchArticlesUseCase } from './SearchArticlesUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { forbidden, HttpResponse, notFound, ok } from '@shared/core/http/HttpResponse';
import {
  UserEmailIsNotVerifiedError,
  UserIsNotAdminError,
  UserNotFoundError,
} from '@shared/core/errors';

export class SearchArticlesController extends WebController<SearchArticlesUseCase> {
  protected async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { categoryName, articleTitle, order, page, perPage, username } = httpRequest.query;

    const orderFormatted = this.resolveQueryOrderBy(order as string);
    const numbersFormatted = this.resolveQueryNumbers({ perPage, page });
    const stringsFormatted = this.resolveQueryStrings({ categoryName, articleTitle, username });

    const result = await this._useCase.execute({
      categoryName: stringsFormatted.categoryName,
      username: stringsFormatted.username,
      articleTitle: stringsFormatted.articleTitle,
      order: orderFormatted,
      page: numbersFormatted.page,
      perPage: numbersFormatted.perPage,
    });

    const isNotFound = this.isTypeofErrors(result, UserNotFoundError.name);

    if (isNotFound) {
      return notFound({ message: result.message });
    }

    const isForbidden = this.isTypeofErrors(
      result,
      UserIsNotAdminError.name,
      UserEmailIsNotVerifiedError.name,
    );

    if (isForbidden) {
      return forbidden({ message: result.message });
    }

    const articlesFormatted = result.data.map((article) => ArticleMapper.toDetails(article));

    return ok({ data: { ...result, data: articlesFormatted }, message: null });
  }
}
