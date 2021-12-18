import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { ArticleNotFoundError, MissingParamError } from '@shared/core/errors';
import { inject, injectable } from 'tsyringe';
import { ArticleWithRelationsDTO } from '../dtos/ArticleWithRelationsDTO';
import { ArticleRepositoryProtocol } from '../repositories/ArticleRepositoryProtocol';

export interface ShowArticleByIdRequest {
  articleId: string;
}

@injectable()
export class ShowPublicArticleByIdUseCase
  implements UseCaseProtocol<ShowArticleByIdRequest, Promise<ArticleWithRelationsDTO>>
{
  constructor(
    @inject('ArticleRepository')
    private readonly _articleRepository: ArticleRepositoryProtocol,
  ) {}

  public async execute({ articleId }: ShowArticleByIdRequest): Promise<ArticleWithRelationsDTO> {
    if (!articleId) throw new MissingParamError('Article id');

    const article = await this._articleRepository.findPublicByIdWithRelations(articleId, {
      withDeleted: false,
    });

    if (!article) throw new ArticleNotFoundError();

    return article;
  }
}
