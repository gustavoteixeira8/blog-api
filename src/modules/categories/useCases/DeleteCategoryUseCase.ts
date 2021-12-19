import { inject, injectable } from 'tsyringe';
import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { CategoryRepositoryProtocol } from '../repositories/CategoryRepositoryProtocol';
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

@injectable()
export class DeleteCategoryUseCase
  implements UseCaseProtocol<DeleteCategoryRequest, Promise<void>>
{
  constructor(
    @inject('CategoryRepository')
    private readonly _categoryRepository: CategoryRepositoryProtocol,
    @inject('UserRepository')
    private readonly _userRepository: UserRepositoryProtocol,
  ) {}

  public async execute({ categoryId, userId }: DeleteCategoryRequest): Promise<void> {
    if (!userId || categoryId) throw new MissingParamError('User id and category id');

    const userExists = await this._userRepository.findById(userId, { withDeleted: false });

    if (!userExists) throw new UserNotFoundError();

    if (!userExists.isEmailVerified) {
      throw new UserEmailIsNotVerifiedError();
    }
    if (!userExists.isAdmin) {
      throw new UserIsNotAdminError();
    }

    const categoryExists = await this._categoryRepository.findById(categoryId);

    if (!categoryExists) throw new CategoryNotFoundError();

    const categoryIsRelatedWithArticle = await this._categoryRepository.existsInArticle(categoryId);

    if (categoryIsRelatedWithArticle) {
      throw new CategoryIsRelatedWithArticleError();
    }

    await this._categoryRepository.delete(categoryId);
  }
}
