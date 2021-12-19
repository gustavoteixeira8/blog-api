import { ArticleMapper } from '@modules/articles/mappers/ArticleMapper';
import { ShowAllPublicArticlesByCategoryUseCase } from '@modules/articles/useCases/ShowAllPublicArticlesByCategoryUseCase';
import { ok } from '@shared/infra/http/utils/httpResponses';
import {
  resolveOrderByParams,
  resolveSearchParamsNumbers,
} from '@shared/infra/http/utils/resolveQueryParams';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ShowAllPublicArticlesByCategoryController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { order, perPage, page } = req.query;
    const { categoryId } = req.params;

    const orderFormatted = resolveOrderByParams(order as string);
    const numbersFormatted = resolveSearchParamsNumbers({ perPage, page });

    const showArticlesByCategory = container.resolve(ShowAllPublicArticlesByCategoryUseCase);

    const result = await showArticlesByCategory.execute({
      categoryId,
      perPage: numbersFormatted.perPage,
      page: numbersFormatted.page,
      order: orderFormatted,
    });

    const articlesFormatted = result.data.map((article) => ArticleMapper.toDetails(article, false));

    return ok(res, { ...result, data: articlesFormatted });
  }
}
