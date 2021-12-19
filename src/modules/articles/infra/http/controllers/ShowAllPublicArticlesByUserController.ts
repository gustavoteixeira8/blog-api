import { ArticleMapper } from '@modules/articles/mappers/ArticleMapper';
import { ShowAllPublicArticlesByUserUseCase } from '@modules/articles/useCases/ShowAllPublicArticlesByUserUseCase';
import { ok } from '@shared/infra/http/utils/httpResponses';
import {
  resolveOrderByParams,
  resolveSearchParamsNumbers,
} from '@shared/infra/http/utils/resolveQueryParams';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ShowAllPublicArticlesByUserController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params;
    const { order, perPage, page } = req.query;

    const orderFormatted = resolveOrderByParams(order as string);
    const numbersFormatted = resolveSearchParamsNumbers({ perPage, page });

    const showArticlesByUser = container.resolve(ShowAllPublicArticlesByUserUseCase);

    const result = await showArticlesByUser.execute({
      userId,
      perPage: numbersFormatted.perPage,
      page: numbersFormatted.page,
      order: orderFormatted,
    });

    const articlesFormatted = result.data.map((article) => ArticleMapper.toDetails(article, false));

    return ok(res, { ...result, data: articlesFormatted });
  }
}
