import { ArticleMapper } from '@modules/articles/mappers/ArticleMapper';
import { SearchArticlesForUserCreatorUseCase } from '@modules/users/useCases/searchArticleForUserCreator/SearchArticlesForUserCreatorUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { HttpResponse, ok } from '@shared/core/http/HttpResponse';

export class SearchArticlesForUserCreatorController extends WebController {
  constructor(useCase: SearchArticlesForUserCreatorUseCase) {
    super(useCase);
  }

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

    const articlesFormatted = result.data.map((article) => ArticleMapper.toDetails(article, false));

    return ok({ message: null, data: { ...result, data: articlesFormatted } });
  }
}
