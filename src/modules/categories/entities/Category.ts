import { Entity } from '@shared/core/entities/Entity';
import { InvalidCategoryNameError, InvalidSlugError } from '@shared/core/errors';
import { CategoryName } from '@shared/core/valueObjects/CategoryName';
import { Identifier } from '@shared/core/valueObjects/Identifier';
import { Slug } from '@shared/core/valueObjects/Slug';
import { CategoryDTO } from '../dtos/CategoryDTO';
import { CategoryProtocol } from './CategoryProtocol';

export type CategoryCreateResponse = Category | InvalidCategoryNameError | InvalidSlugError;

export class Category extends Entity<CategoryProtocol> implements CategoryProtocol {
  private _name: CategoryName;
  private _slug: Slug;
  private _createdAt: Date;
  private _updatedAt: Date;

  get name(): CategoryName {
    return this._name;
  }
  get slug(): Slug {
    return this._slug;
  }
  get createdAt(): Date {
    return this._createdAt;
  }
  get updatedAt(): Date {
    return this._updatedAt;
  }

  private constructor(props: CategoryProtocol) {
    super(props);
    this._name = props.name;
    this._slug = props.slug;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  public static create(props: CategoryDTO): CategoryCreateResponse {
    const categoryOrError = {
      id: Identifier.create(props.id) as Identifier,
      name: CategoryName.create(props.name) as CategoryName,
      slug: Slug.create(props.slug) as Slug,
      createdAt: !props.createdAt ? new Date() : props.createdAt,
      updatedAt: !props.updatedAt ? new Date() : props.updatedAt,
    };

    for (const key in categoryOrError) {
      if (categoryOrError[key] instanceof Error) {
        return categoryOrError[key];
      }
    }

    return new Category(categoryOrError);
  }

  public updateName(name: CategoryName, slug: Slug): void {
    if (this._name.equals(name)) return;

    this._name = name;
    this._slug = slug;
    this._updatedAt = new Date();
  }
}
