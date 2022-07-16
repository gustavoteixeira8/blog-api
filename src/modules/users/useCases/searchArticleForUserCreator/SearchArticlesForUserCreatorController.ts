import { ArticleMapper } from '@modules/articles/mappers/ArticleMapper';
import { SearchArticlesForUserCreatorUseCase } from '@modules/users/useCases/searchArticleForUserCreator/SearchArticlesForUserCreatorUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { MissingParamError, UserIsNotAdminError } from '@shared/core/errors';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { badRequest, forbidden, HttpResponse, ok } from '@shared/core/http/HttpResponse';

export class SearchArticlesForUserCreatorController extends WebController<SearchArticlesForUserCreatorUseCase> {
  public async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { categoryName, articleTitle, isPublic, isDeleted, order, page, perPage } =
      httpRequest.query;
    const { userId } = httpRequest.userData;

    const orderFormatted = this.resolveQueryOrderBy(order as string);
    const numbersFormatted = this.resolveQueryNumbers({ perPage, page });
    const stringsFormatted = this.resolveQueryStrings({ categoryName, articleTitle });
    const boolFormatted = this.resolveQueryBoolean({ isPublic, isDeleted });

    const result = await this._useCase.execute({
      userId,
      categoryName: stringsFormatted.categoryName,
      articleTitle: stringsFormatted.articleTitle,
      isDeleted: boolFormatted.isDeleted,
      isPublic: boolFormatted.isPublic,
      order: orderFormatted,
      page: numbersFormatted.page,
      perPage: numbersFormatted.perPage,
    });

    const isBadRequest = this.isTypeofErrors(result, MissingParamError.name);

    if (isBadRequest) {
      return badRequest({ message: result.message });
    }

    const isForbidden = this.isTypeofErrors(result, UserIsNotAdminError.name);

    if (isForbidden) {
      return forbidden({ message: result.message });
    }

    const articlesFormatted = result.data.map((article) => ArticleMapper.toDetails(article, false));

    return ok({ message: null, data: { ...result, data: articlesFormatted } });
  }
}
