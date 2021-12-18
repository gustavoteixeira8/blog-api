import { UpdateCategoryUseCase } from '@modules/categories/useCases/UpdateCategoryUseCase';
import { ok } from '@shared/infra/http/utils/httpResponses';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class UpdateCategoryController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    const { categoryId } = req.params;
    const { userId } = req.userData;

    const updateCategory = container.resolve(UpdateCategoryUseCase);

    await updateCategory.execute({ name, categoryId, userId });

    return ok(res, { message: 'Category was updated successfully' });
  }
}
