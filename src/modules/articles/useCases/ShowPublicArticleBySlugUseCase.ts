import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { ArticleNotFoundError, MissingParamError } from '@shared/core/errors';
import { inject, injectable } from 'tsyringe';
import { ArticleWithRelationsDTO } from '../dtos/ArticleWithRelationsDTO';
import { ArticleRepositoryProtocol } from '../repositories/ArticleRepositoryProtocol';

export interface ShowArticleBySlugRequest {
  articleSlug: string;
}

@injectable()
export class ShowPublicArticleBySlugUseCase
  implements UseCaseProtocol<ShowArticleBySlugRequest, Promise<ArticleWithRelationsDTO>>
{
  constructor(
    @inject('ArticleRepository')
    private readonly _articleRepository: ArticleRepositoryProtocol,
  ) {}

  public async execute({
    articleSlug,
  }: ShowArticleBySlugRequest): Promise<ArticleWithRelationsDTO> {
    if (!articleSlug) throw new MissingParamError('Article slug');

    const article = await this._articleRepository.findPublicBySlugWithRelations(articleSlug, {
      withDeleted: false,
    });

    if (!article) throw new ArticleNotFoundError();

    return article;
  }
}
