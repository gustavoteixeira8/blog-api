import { DeleteCategoryUseCase } from '@modules/categories/useCases/DeleteCategoryUseCase';
import { ok } from '@shared/infra/http/utils/httpResponses';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class DeleteCategoryController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { categoryId } = req.params;
    const { userId } = req.userData;

    const deleteCategory = container.resolve(DeleteCategoryUseCase);

    await deleteCategory.execute({ categoryId, userId });

    return ok(res, { message: 'Category was successfully deleted' });
  }
}
