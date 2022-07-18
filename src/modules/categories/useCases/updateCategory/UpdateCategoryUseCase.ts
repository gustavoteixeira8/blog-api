import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { CategoryRepositoryProtocol } from '../../repositories/CategoryRepositoryProtocol';
import { CategoryName } from '@shared/core/valueObjects/CategoryName';
import { Slug } from '@shared/core/valueObjects/Slug';
import { SlugAdapterProtocol } from '@shared/adapters/slugAdapter/SlugAdapterProtocol';
import { UserRepositoryProtocol } from '@modules/users/repositories/UserRepositoryProtocol';
import {
  CategoryNameAlreadyExistsError,
  CategoryNotFoundError,
  InvalidCategoryNameError,
  InvalidSlugError,
  MissingParamError,
  UserEmailIsNotVerifiedError,
  UserIsNotAdminError,
  UserNotFoundError,
} from '@shared/core/errors';

export interface UpdateCategoryRequest {
  categoryId: string;
  userId: string;
  name: string;
}

export type UpdateCategoryResponse = Promise<
  | void
  | CategoryNameAlreadyExistsError
  | InvalidCategoryNameError
  | InvalidSlugError
  | MissingParamError
  | UserEmailIsNotVerifiedError
  | UserIsNotAdminError
  | CategoryNotFoundError
  | UserNotFoundError
>;

export class UpdateCategoryUseCase
  implements UseCaseProtocol<UpdateCategoryRequest, UpdateCategoryResponse>
{
  constructor(
    private readonly _categoryRepository: CategoryRepositoryProtocol,
    private readonly _userRepository: UserRepositoryProtocol,
    private readonly _slugAdapter: SlugAdapterProtocol,
  ) {}

  public async execute({
    categoryId,
    name,
    userId,
  }: UpdateCategoryRequest): UpdateCategoryResponse {
    if (!userId || !categoryId) return new MissingParamError('User id and category id');

    if (!name) {
      return new MissingParamError('Category name');
    }

    const userExists = await this._userRepository.findById(userId, { withDeleted: false });

    if (!userExists) return new UserNotFoundError();

    if (!userExists.isEmailVerified) {
      return new UserEmailIsNotVerifiedError();
    }
    if (!userExists.isAdmin) {
      return new UserIsNotAdminError();
    }

    const category = await this._categoryRepository.findById(categoryId);

    if (!category) return new CategoryNotFoundError();

    const slug = this._slugAdapter.generate(name);

    const categoryAlreadyExists = await this._categoryRepository.existsWithSlug(slug);

    if (categoryAlreadyExists && category.slug.value !== slug) {
      return new CategoryNameAlreadyExistsError();
    }

    const categoryNameOrError = CategoryName.create(name);
    const slugOrError = Slug.create(slug);

    if (categoryNameOrError instanceof Error) {
      return new InvalidCategoryNameError();
    }
    if (slugOrError instanceof Error) {
      return new InvalidSlugError();
    }

    category.updateName(categoryNameOrError, slugOrError);

    await this._categoryRepository.save(category);
  }
}
