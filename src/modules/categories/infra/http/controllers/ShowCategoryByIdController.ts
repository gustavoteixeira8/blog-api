import { CategoryMapper } from '@modules/categories/mappers/CategoryMapper';
import { ShowCategoryByIdUseCase } from '@modules/categories/useCases/ShowCategoryByIdUseCase';
import { ok } from '@shared/infra/http/utils/httpResponses';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ShowCategoryByIdController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { categoryId } = req.params;

    const showCategory = container.resolve(ShowCategoryByIdUseCase);

    const category = await showCategory.execute({ categoryId });

    const categoryFormatted = CategoryMapper.toDetails(category);

    return ok(res, { category: categoryFormatted });
  }
}
