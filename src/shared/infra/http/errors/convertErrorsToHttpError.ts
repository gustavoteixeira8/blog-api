import {
  ArticleIsNotYoursError,
  ArticleNotFoundError,
  ArticleTitleAlreadyExistsError,
  CategoryIsRelatedWithArticleError,
  CategoryNameAlreadyExistsError,
  CategoryNotFoundError,
  EmailAlreadyExistsError,
  InvalidArticleTextError,
  InvalidArticleTitleError,
  InvalidCategoryNameError,
  InvalidEmailError,
  InvalidFullNameError,
  InvalidImageNameError,
  InvalidPasswordError,
  InvalidSlugError,
  InvalidTokenError,
  InvalidUsernameError,
  LoginOrPasswordInvalidError,
  MissingParamError,
  PasswordMustBeEqualConfirmPasswordError,
  UserEmailIsNotVerifiedError,
  UserIsNotAdminError,
  UsernameAlreadyExistsError,
  UserNotFoundError,
} from '../../../core/errors';
import {
  BadRequestError,
  ForbiddenError,
  HttpErrorProtocol,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from './httpErrors';

export function convertErrorsToHttpError(error: Error): HttpErrorProtocol {
  switch (error.constructor) {
    case MissingParamError:
      return new BadRequestError(error.message);

    case UserNotFoundError:
      return new NotFoundError(error.message);

    case EmailAlreadyExistsError:
      return new BadRequestError(error.message);

    case UsernameAlreadyExistsError:
      return new BadRequestError(error.message);

    case LoginOrPasswordInvalidError:
      return new UnauthorizedError(error.message);

    case UserIsNotAdminError:
      return new ForbiddenError(error.message);

    case UserEmailIsNotVerifiedError:
      return new ForbiddenError(error.message);

    case PasswordMustBeEqualConfirmPasswordError:
      return new BadRequestError(error.message);

    case InvalidPasswordError:
      return new BadRequestError(error.message);

    case InvalidEmailError:
      return new BadRequestError(error.message);

    case InvalidFullNameError:
      return new BadRequestError(error.message);

    case InvalidTokenError:
      return new UnauthorizedError(error.message);

    case InvalidArticleTextError:
      return new BadRequestError(error.message);

    case InvalidArticleTitleError:
      return new BadRequestError(error.message);

    case InvalidCategoryNameError:
      return new BadRequestError(error.message);

    case InvalidImageNameError:
      return new BadRequestError(error.message);

    case InvalidSlugError:
      return new BadRequestError(error.message);

    case InvalidUsernameError:
      return new BadRequestError(error.message);

    case CategoryNameAlreadyExistsError:
      return new BadRequestError(error.message);

    case CategoryNotFoundError:
      return new NotFoundError(error.message);

    case CategoryIsRelatedWithArticleError:
      return new BadRequestError(error.message);

    case ArticleTitleAlreadyExistsError:
      return new BadRequestError(error.message);

    case ArticleNotFoundError:
      return new NotFoundError(error.message);

    case ArticleIsNotYoursError:
      return new NotFoundError(error.message);

    default:
      return new InternalServerError();
  }
}
