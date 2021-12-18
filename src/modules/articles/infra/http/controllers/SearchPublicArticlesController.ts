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
    const { order, page, perPage, articleTitle, categorySlug, username } = req.query;

    const orderFormatted = resolveOrderByParams(order as string);
    const numbersFormatted = resolveSearchParamsNumbers({ perPage, page });
    const stringsFormatted = resolveSearchParamsStrings({ articleTitle, categorySlug, username });

    const searchArticles = container.resolve(SearchPublicArticlesUseCase);

    const result = await searchArticles.execute({
      title: stringsFormatted.articleTitle,
      categorySlug: stringsFormatted.categorySlug,
      username: stringsFormatted.username,
      order: orderFormatted,
      page: numbersFormatted.page,
      perPage: numbersFormatted.perPage,
    });

    const articlesFormatted = result.data.map((article) => ArticleMapper.toDetails(article, false));

    return ok(res, { articles: { ...result, data: articlesFormatted } });
  }
}
