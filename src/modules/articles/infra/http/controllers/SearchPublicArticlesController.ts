import { ArticleMapper } from '@modules/articles/mappers/ArticleMapper';
import { SearchPublicArticlesUseCase } from '@modules/articles/useCases/SearchPublicArticlesUseCase';
import { ok } from '@shared/infra/http/utils/httpResponses';
import {
  resolveOrderByParams,
  resolveSearchParamsNumbers,
  resolveSearchParamsStrings,
} from '@shared/infra/http/utils/resolveQueryParams';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class SearchPublicArticlesController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { categoryName, articleTitle, order, page, perPage, username } = req.query;

    const orderFormatted = resolveOrderByParams(order as string);
    const numbersFormatted = resolveSearchParamsNumbers({ perPage, page });
    const stringsFormatted = resolveSearchParamsStrings({ categoryName, articleTitle, username });

    const searchForCreator = container.resolve(SearchPublicArticlesUseCase);

    const result = await searchForCreator.execute({
      categoryName: stringsFormatted.categoryName,
      username: stringsFormatted.username,
      articleTitle: stringsFormatted.articleTitle,
      order: orderFormatted,
      page: numbersFormatted.page,
      perPage: numbersFormatted.perPage,
    });

    const articlesFormatted = result.data.map((article) => ArticleMapper.toDetails(article, false));

    return ok(res, { articles: { ...result, data: articlesFormatted } });
  }
}
