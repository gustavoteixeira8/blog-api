"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsernameAlreadyExistsError = exports.UserNotFoundError = exports.UserIsNotAdminError = exports.UserEmailIsNotVerifiedError = exports.PasswordMustBeEqualConfirmPasswordError = exports.MissingParamError = exports.LoginOrPasswordInvalidError = exports.InvalidUsernameError = exports.InvalidTokenError = exports.InvalidSlugError = exports.InvalidPasswordError = exports.InvalidImageNameError = exports.InvalidFullNameError = exports.InvalidForeignKeyError = exports.InvalidEmailError = exports.InvalidCategoryNameError = exports.InvalidArticleTitleError = exports.InvalidArticleTextError = exports.EntityError = exports.EmailAlreadyExistsError = exports.CategoryNotFoundError = exports.CategoryNameAlreadyExistsError = exports.CategoryIsRelatedWithArticleError = exports.ArticleTitleAlreadyExistsError = exports.ArticleNotFoundError = exports.ArticleIsNotYoursError = void 0;

class EntityError extends Error {
  constructor(...messages) {
    super();
    this.name = 'EntityError';
    this.messages = void 0;
    this.messages = messages;
    Error.captureStackTrace(this);
    Object.assign(Error.prototype, EntityError.prototype);
  }

}

exports.EntityError = EntityError;

class UserNotFoundError extends Error {
  constructor(message) {
    super(message || 'User not found');
    this.name = 'UserNotFoundError';
  }

}

exports.UserNotFoundError = UserNotFoundError;

class MissingParamError extends Error {
  constructor(paramsName) {
    super(`${paramsName} must be provided`);
    this.name = 'MissingParamError';
  }

}

exports.MissingParamError = MissingParamError;

class EmailAlreadyExistsError extends Error {
  constructor() {
    super('Invalid email, try another');
    this.name = 'EmailAlreadyExistsError';
  }

}

exports.EmailAlreadyExistsError = EmailAlreadyExistsError;

class UsernameAlreadyExistsError extends Error {
  constructor() {
    super('Invalid username, try another');
    this.name = 'UsernameAlreadyExistsError';
  }

}

exports.UsernameAlreadyExistsError = UsernameAlreadyExistsError;

class LoginOrPasswordInvalidError extends Error {
  constructor() {
    super('Login or Password is not valid');
    this.name = 'LoginOrPasswordInvalidError';
  }

}

exports.LoginOrPasswordInvalidError = LoginOrPasswordInvalidError;

class UserIsNotAdminError extends Error {
  constructor() {
    super('You must be an admin');
    this.name = 'UserIsNotAdminError';
  }

}

exports.UserIsNotAdminError = UserIsNotAdminError;

class UserEmailIsNotVerifiedError extends Error {
  constructor() {
    super('Your email must be verified');
    this.name = 'UserEmailIsNotVerifiedErrorError';
  }

}

exports.UserEmailIsNotVerifiedError = UserEmailIsNotVerifiedError;

class InvalidPasswordError extends Error {
  constructor() {
    super('Password must have at least 8 characters between uppercase, lowercase, symbols and numbers');
    this.name = 'InvalidPasswordError';
  }

}

exports.InvalidPasswordError = InvalidPasswordError;

class InvalidEmailError extends Error {
  constructor() {
    super('Invalid email');
    this.name = 'InvalidEmailError';
  }

}

exports.InvalidEmailError = InvalidEmailError;

class InvalidFullNameError extends Error {
  constructor() {
    super('Name must be between 2 and 255 characters');
    this.name = 'InvalidFullNameError';
  }

}

exports.InvalidFullNameError = InvalidFullNameError;

class InvalidTokenError extends Error {
  constructor(message) {
    super(message || 'Invalid token');
    this.name = 'InvalidTokenError';
  }

}

exports.InvalidTokenError = InvalidTokenError;

class PasswordMustBeEqualConfirmPasswordError extends Error {
  constructor() {
    super('Password must be equal confirm password');
    this.name = 'PasswordMustBeEqualConfirmPasswordError';
  }

}

exports.PasswordMustBeEqualConfirmPasswordError = PasswordMustBeEqualConfirmPasswordError;

class InvalidArticleTextError extends Error {
  constructor() {
    super('Article text must be between 100 and 30000 characters');
    this.name = 'InvalidArticleTextError';
  }

}

exports.InvalidArticleTextError = InvalidArticleTextError;

class InvalidArticleTitleError extends Error {
  constructor() {
    super(`Title must be between 5 and 255 characters'`);
    this.name = 'InvalidArticleTitleError';
  }

}

exports.InvalidArticleTitleError = InvalidArticleTitleError;

class InvalidCategoryNameError extends Error {
  constructor() {
    super(`Category name must be between 3 and 255 characters`);
    this.name = 'InvalidCategoryNameError';
  }

}

exports.InvalidCategoryNameError = InvalidCategoryNameError;

class InvalidImageNameError extends Error {
  constructor() {
    super(`Image name must be in jpeg, png, gif, bmp and webp`);
    this.name = 'InvalidCategoryNameError';
  }

}

exports.InvalidImageNameError = InvalidImageNameError;

class InvalidSlugError extends Error {
  constructor() {
    super('Invalid slug');
    this.name = 'InvalidSlugError';
  }

}

exports.InvalidSlugError = InvalidSlugError;

class InvalidUsernameError extends Error {
  constructor() {
    super('Username must be between 2 and 255 characters with no spaces');
    this.name = 'InvalidSlugError';
  }

}

exports.InvalidUsernameError = InvalidUsernameError;

class CategoryNameAlreadyExistsError extends Error {
  constructor() {
    super('Category already exists');
    this.name = 'CategoryNameAlreadyExistsError';
  }

}

exports.CategoryNameAlreadyExistsError = CategoryNameAlreadyExistsError;

class CategoryNotFoundError extends Error {
  constructor() {
    super('Category not found');
    this.name = 'CategoryNotFoundError';
  }

}

exports.CategoryNotFoundError = CategoryNotFoundError;

class CategoryIsRelatedWithArticleError extends Error {
  constructor() {
    super('Category is related with an article');
    this.name = 'CategoryIsRelatedWithArticleError';
  }

}

exports.CategoryIsRelatedWithArticleError = CategoryIsRelatedWithArticleError;

class ArticleTitleAlreadyExistsError extends Error {
  constructor() {
    super('An article with this title already exists');
    this.name = 'ArticleTitleAlreadyExistsError';
  }

}

exports.ArticleTitleAlreadyExistsError = ArticleTitleAlreadyExistsError;

class ArticleNotFoundError extends Error {
  constructor() {
    super('Article not found');
    this.name = 'ArticleNotFoundError';
  }

}

exports.ArticleNotFoundError = ArticleNotFoundError;

class ArticleIsNotYoursError extends Error {
  constructor() {
    super('This is not your article, so you cannot change it');
    this.name = 'ArticleIsNotYoursError';
  }

}

exports.ArticleIsNotYoursError = ArticleIsNotYoursError;

class InvalidForeignKeyError extends Error {
  constructor() {
    super('Invalid foreign key');
    this.name = 'InvalidForeignKeyError';
  }

}

exports.InvalidForeignKeyError = InvalidForeignKeyError;