"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertErrorsToHttpError = convertErrorsToHttpError;

var _errors = require("../../../core/errors");

var _httpErrors = require("./httpErrors");

function convertErrorsToHttpError(error) {
  switch (error.constructor) {
    case _errors.MissingParamError:
      return new _httpErrors.BadRequestError(error.message);

    case _errors.UserNotFoundError:
      return new _httpErrors.NotFoundError(error.message);

    case _errors.EmailAlreadyExistsError:
      return new _httpErrors.BadRequestError(error.message);

    case _errors.UsernameAlreadyExistsError:
      return new _httpErrors.BadRequestError(error.message);

    case _errors.LoginOrPasswordInvalidError:
      return new _httpErrors.UnauthorizedError(error.message);

    case _errors.UserIsNotAdminError:
      return new _httpErrors.ForbiddenError(error.message);

    case _errors.UserEmailIsNotVerifiedError:
      return new _httpErrors.ForbiddenError(error.message);

    case _errors.PasswordMustBeEqualConfirmPasswordError:
      return new _httpErrors.BadRequestError(error.message);

    case _errors.InvalidPasswordError:
      return new _httpErrors.BadRequestError(error.message);

    case _errors.InvalidEmailError:
      return new _httpErrors.BadRequestError(error.message);

    case _errors.InvalidFullNameError:
      return new _httpErrors.BadRequestError(error.message);

    case _errors.InvalidTokenError:
      return new _httpErrors.UnauthorizedError(error.message);

    case _errors.InvalidArticleTextError:
      return new _httpErrors.BadRequestError(error.message);

    case _errors.InvalidArticleTitleError:
      return new _httpErrors.BadRequestError(error.message);

    case _errors.InvalidCategoryNameError:
      return new _httpErrors.BadRequestError(error.message);

    case _errors.InvalidImageNameError:
      return new _httpErrors.BadRequestError(error.message);

    case _errors.InvalidSlugError:
      return new _httpErrors.BadRequestError(error.message);

    case _errors.InvalidUsernameError:
      return new _httpErrors.BadRequestError(error.message);

    case _errors.CategoryNameAlreadyExistsError:
      return new _httpErrors.BadRequestError(error.message);

    case _errors.CategoryNotFoundError:
      return new _httpErrors.NotFoundError(error.message);

    case _errors.CategoryIsRelatedWithArticleError:
      return new _httpErrors.BadRequestError(error.message);

    case _errors.ArticleTitleAlreadyExistsError:
      return new _httpErrors.BadRequestError(error.message);

    case _errors.ArticleNotFoundError:
      return new _httpErrors.NotFoundError(error.message);

    case _errors.ArticleIsNotYoursError:
      return new _httpErrors.NotFoundError(error.message);

    default:
      return new _httpErrors.InternalServerError();
  }
}