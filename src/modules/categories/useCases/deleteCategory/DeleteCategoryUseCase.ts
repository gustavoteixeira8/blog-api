import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { CategoryRepositoryProtocol } from '../../repositories/CategoryRepositoryProtocol';
import { UserRepositoryProtocol } from '@modules/users/repositories/UserRepositoryProtocol';
import {
  CategoryIsRelatedWithArticleError,
  CategoryNotFoundError,
  MissingParamError,
  UserEmailIsNotVerifiedError,
  UserIsNotAdminError,
  UserNotFoundError,
} from '@shared/core/errors';

export interface DeleteCategoryRequest {
  categoryId: string;
  userId: string;
}

export type DeleteCategoryResponse = Promise<
  | void
  | CategoryIsRelatedWithArticleError
  | CategoryNotFoundError
  | MissingParamError
  | UserEmailIsNotVerifiedError
  | UserIsNotAdminError
  | UserNotFoundError
>;

export class DeleteCategoryUseCase
  implements UseCaseProtocol<DeleteCategoryRequest, DeleteCategoryResponse>
{
  constructor(
    private readonly _categoryRepository: CategoryRepositoryProtocol,
    private readonly _userRepository: UserRepositoryProtocol,
  ) {}

  public async execute({ categoryId, userId }: DeleteCategoryRequest): DeleteCategoryResponse {
    if (!userId || !categoryId) return new MissingParamError('User id and category id');

    const userExists = await this._userRepository.findById(userId, { withDeleted: false });

    if (!userExists) return new UserNotFoundError();

    if (!userExists.isEmailVerified) {
      return new UserEmailIsNotVerifiedError();
    }
    if (!userExists.isAdmin) {
      return new UserIsNotAdminError();
    }

    const categoryExists = await this._categoryRepository.findById(categoryId);

    if (!categoryExists) return new CategoryNotFoundError();

    const categoryIsRelatedWithArticle = await this._categoryRepository.existsInArticle(categoryId);

    if (categoryIsRelatedWithArticle) {
      return new CategoryIsRelatedWithArticleError();
    }

    await this._categoryRepository.delete(categoryId);
  }
}
