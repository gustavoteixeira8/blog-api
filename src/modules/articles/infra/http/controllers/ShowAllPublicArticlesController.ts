import { ArticleMapper } from '@modules/articles/mappers/ArticleMapper';
import { ShowAllPublicArticlesUseCase } from '@modules/articles/useCases/ShowAllPublicArticlesUseCase';
import { ok } from '@shared/infra/http/utils/httpResponses';
import {
  resolveOrderByParams,
  resolveSearchParamsNumbers,
} from '@shared/infra/http/utils/resolveQueryParams';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ShowAllPublicArticlesController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { order, page, perPage } = req.query;

    const orderFormatted = resolveOrderByParams(order as string);
    const numbersFormatted = resolveSearchParamsNumbers({ perPage, page });

    const showArticles = container.resolve(ShowAllPublicArticlesUseCase);

    const result = await showArticles.execute({
      order: orderFormatted,
      page: numbersFormatted.page,
      perPage: numbersFormatted.perPage,
    });

    const articlesFormatted = result.data.map((article) => ArticleMapper.toDetails(article, false));

    return ok(res, { articles: { ...result, data: articlesFormatted } });
  }
}
