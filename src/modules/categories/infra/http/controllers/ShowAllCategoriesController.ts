import { CategoryMapper } from '@modules/categories/mappers/CategoryMapper';
import { ShowAllCategoriesUseCase } from '@modules/categories/useCases/ShowAllCategoriesUseCase';
import { ok } from '@shared/infra/http/utils/httpResponses';
import {
  resolveOrderByParams,
  resolveSearchParamsNumbers,
} from '@shared/infra/http/utils/resolveQueryParams';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ShowAllCategoriesController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { order, perPage, page } = req.query;

    const orderFormatted = resolveOrderByParams(order as string);
    const numbersFormatted = resolveSearchParamsNumbers({ perPage, page });

    const showCategories = container.resolve(ShowAllCategoriesUseCase);

    const result = await showCategories.execute({
      perPage: numbersFormatted.perPage,
      page: numbersFormatted.page,
      order: orderFormatted,
    });

    const articlesFormatted = result.data.map(CategoryMapper.toDetails);

    return ok(res, { ...result, data: articlesFormatted });
  }
}
