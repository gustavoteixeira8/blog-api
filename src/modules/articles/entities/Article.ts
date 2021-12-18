import { ArticleDTO } from '@modules/articles/dtos/ArticleDTO';
import { Entity } from '@shared/core/entities/Entity';
import { ArticleText } from '@shared/core/entities/valueObjects/ArticleText';
import { ArticleTitle } from '@shared/core/entities/valueObjects/ArticleTitle';
import { ForeignKeyId } from '@shared/core/entities/valueObjects/ForeignKeyId';
import { Identifier } from '@shared/core/entities/valueObjects/Identifier';
import { ImageName } from '@shared/core/entities/valueObjects/ImageName';
import { Slug } from '@shared/core/entities/valueObjects/Slug';
import { EntityError } from '@shared/core/errors';
import { ArticleProtocol } from './ArticleProtocol';

export class Article extends Entity<ArticleProtocol> implements ArticleProtocol {
  private _title: ArticleTitle;
  private _text: ArticleText;
  private _slug: Slug;
  private _isPublic: boolean;
  private _thumbnail: ImageName | null;
  private _categoriesId: ForeignKeyId[];
  private _userId: ForeignKeyId;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _deletedAt: Date | null;

  get title(): ArticleTitle {
    return this._title;
  }
  get text(): ArticleText {
    return this._text;
  }
  get categoriesId(): ForeignKeyId[] {
    return this._categoriesId;
  }
  get slug(): Slug {
    return this._slug;
  }
  get isPublic(): boolean {
    return this._isPublic;
  }
  get thumbnail(): ImageName | null {
    return this._thumbnail;
  }
  get userId(): ForeignKeyId {
    return this._userId;
  }
  get createdAt(): Date {
    return this._createdAt;
  }
  get updatedAt(): Date {
    return this._updatedAt;
  }
  get deletedAt(): Date | null {
    return this._deletedAt;
  }

  private constructor(props: ArticleProtocol) {
    super(props);
    this._title = props.title;
    this._text = props.text;
    this._categoriesId = props.categoriesId;
    this._slug = props.slug;
    this._thumbnail = props.thumbnail;
    this._userId = props.userId;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
    this._deletedAt = props.deletedAt;
    this._isPublic = props.isPublic;
  }

  public static create(article: ArticleDTO): Article {
    const articleOrError: ArticleProtocol = {
      id: Identifier.create(article.id),
      title: ArticleTitle.create(article.title) as ArticleTitle,
      text: ArticleText.create(article.text) as ArticleText,
      slug: Slug.create(article.slug) as Slug,
      isPublic: article.isPublic,
      thumbnail:
        article.thumbnail === null ? null : (ImageName.create(article.thumbnail) as ImageName),
      userId: ForeignKeyId.create(article.userId) as ForeignKeyId,
      categoriesId: article.categoriesId.map((id) => ForeignKeyId.create(id)) as ForeignKeyId[],
      createdAt: !article.createdAt ? new Date() : article.createdAt,
      updatedAt: !article.updatedAt ? new Date() : article.updatedAt,
      deletedAt: !article.deletedAt ? null : article.deletedAt,
    };

    const errors: string[] = [];

    for (const key in articleOrError) {
      if (articleOrError[key] instanceof Error) {
        errors.push(articleOrError[key].message);
      }
    }

    if (errors.length) {
      throw new EntityError(...errors);
    }

    const categoriesAreTheSame = this.categoriesAreTheSame(articleOrError.categoriesId);
    const categoriesIsFull = this.categoriesIsFull(articleOrError.categoriesId);

    if (categoriesAreTheSame || categoriesIsFull) {
      throw new EntityError('Maximum of different categories are 5');
    }

    return new Article(articleOrError);
  }

  private static categoriesAreTheSame(categories: ForeignKeyId[]): boolean {
    const categoriesIdAsString: string[] = categories.map((id) => id.value);

    const categoriesRepeated = categoriesIdAsString.filter(
      (id) => categoriesIdAsString.indexOf(id) !== categoriesIdAsString.lastIndexOf(id),
    );

    return !!categoriesRepeated.length;
  }

  private static categoriesIsFull(categories: ForeignKeyId[]): boolean {
    return categories.length > 5;
  }

  public updateCategories(categories: ForeignKeyId[]): void {
    if (Article.categoriesAreTheSame(categories) || Article.categoriesIsFull(this._categoriesId)) {
      throw new EntityError('Maximum of different categories are 5');
    }

    this._categoriesId = categories;
    this._updatedAt = new Date();
  }

  public updateText(text: ArticleText): void {
    if (this._text.equals(text)) return;

    this._text = text;
    this._updatedAt = new Date();
  }

  public updateThumbnail(thumbnail: ImageName | null): void {
    if (thumbnail === null) {
      this._thumbnail = thumbnail;
      this._updatedAt = new Date();
      return;
    }

    if (this._thumbnail && this._thumbnail.equals(thumbnail)) {
      return;
    }

    this._thumbnail = thumbnail;
    this._updatedAt = new Date();
  }

  public updateTitle(title: ArticleTitle, slug: Slug): void {
    if (this._title.equals(title) && this._slug.equals(slug)) return;

    this._title = title;
    this._slug = slug;
    this._updatedAt = new Date();
  }

  public makePublic(): void {
    if (!this._isPublic) {
      this._isPublic = true;
      this._updatedAt = new Date();
    }
  }

  public makePrivate(): void {
    if (this._isPublic) {
      this._isPublic = false;
      this._updatedAt = new Date();
    }
  }

  public delete(): void {
    if (!this._deletedAt) {
      const date = new Date();
      this._deletedAt = date;
      this._updatedAt = date;
    }
  }

  public recover(): void {
    if (this._deletedAt) {
      this._deletedAt = null;
      this._updatedAt = new Date();
    }
  }
}
