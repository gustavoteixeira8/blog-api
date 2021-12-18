import { inject, injectable } from 'tsyringe';
import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { DateProviderProtocol } from '@shared/providers/dateProvider/DateProviderProtocol';
import { ArticleRepositoryProtocol } from '../repositories/ArticleRepositoryProtocol';

@injectable()
export class DeleteAllArticlesUseCase implements UseCaseProtocol<void, Promise<void>> {
  constructor(
    @inject('ArticleRepository')
    private readonly _articleRepository: ArticleRepositoryProtocol,
    @inject('DateProvider')
    private readonly _dateProvider: DateProviderProtocol,
  ) {}

  public async execute(): Promise<void> {
    const articles = await this._articleRepository.findAllDeleted();

    for (const article of articles) {
      if (!article.deletedAt) continue;

      const deletedAtPlusOneMonth = this._dateProvider.add(article.deletedAt, { months: 1 });

      if (deletedAtPlusOneMonth.getTime() < Date.now()) continue;

      await this._articleRepository.delete(article.id.value);
    }
  }
}
