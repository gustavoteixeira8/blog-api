import { ArticleMapper } from '@modules/articles/mappers/ArticleMapper';
import { SearchPublicArticlesUseCase } from './SearchPublicArticlesUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { HttpResponse, ok } from '@shared/core/http/HttpResponse';

export class SearchPublicArticlesController extends WebController<SearchPublicArticlesUseCase> {
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

    const articlesFormatted = result.data.map((article) => ArticleMapper.toDetails(article, false));

    return ok({ data: { ...result, data: articlesFormatted }, message: null });
  }
}
