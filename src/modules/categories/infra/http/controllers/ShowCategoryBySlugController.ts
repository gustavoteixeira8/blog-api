import { CategoryMapper } from '@modules/categories/mappers/CategoryMapper';
import { ShowCategoryBySlugUseCase } from '@modules/categories/useCases/ShowCategoryBySlugUseCase';
import { ok } from '@shared/infra/http/utils/httpResponses';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ShowCategoryBySlugController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { categorySlug } = req.params;

    const showCategory = container.resolve(ShowCategoryBySlugUseCase);

    const category = await showCategory.execute({ categorySlug });

    const categoryFormatted = CategoryMapper.toDetails(category);

    return ok(res, { category: categoryFormatted });
  }
}
