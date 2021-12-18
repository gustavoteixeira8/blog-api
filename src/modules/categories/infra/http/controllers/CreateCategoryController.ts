import { CreateCategoryUseCase } from '@modules/categories/useCases/CreateCategoryUseCase';
import { created } from '@shared/infra/http/utils/httpResponses';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreateCategoryController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    const { userId } = req.userData;

    const createCategory = container.resolve(CreateCategoryUseCase);

    await createCategory.execute({ name, userId });

    return created(res, { message: 'Category was successfully created' });
  }
}
