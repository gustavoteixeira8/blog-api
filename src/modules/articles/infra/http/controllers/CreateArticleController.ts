import { CreateArticleUseCase } from '@modules/articles/useCases/CreateArticleUseCase';
import { created } from '@shared/infra/http/utils/httpResponses';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreateArticleController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { title, text, isPublic, categoriesId } = req.body;
    const { userId } = req.userData;

    const createArticle = container.resolve(CreateArticleUseCase);

    await createArticle.execute({ title, text, isPublic, categoriesId, userId });

    return created(res, { message: 'Your article was created successfully' });
  }
}
