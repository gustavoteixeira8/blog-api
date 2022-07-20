export class EntityError extends Error {
  public readonly name = 'EntityError';
  public readonly messages: string[];

  constructor(...messages: string[]) {
    super();
    this.messages = messages;
    Error.captureStackTrace(this);
    Object.assign(Error.prototype, EntityError.prototype);
  }
}

export class MaxOfDifferentCategoriesError extends Error {
  public readonly name = 'MaxOfDifferentCategoriesError';

  constructor() {
    super('Maximum of different categories are 5');
  }
}

export class UserNotFoundError extends Error {
  public readonly name = 'UserNotFoundError';

  constructor(message?: string) {
    super(message || 'User not found');
  }
}

export class MissingParamError extends Error {
  public readonly name = 'MissingParamError';

  constructor(paramsName: string) {
    super(`${paramsName} must be provided`);
  }
}

export class EmailAlreadyExistsError extends Error {
  public readonly name = 'EmailAlreadyExistsError';

  constructor() {
    super('Invalid email, try another');
  }
}

export class UsernameAlreadyExistsError extends Error {
  public readonly name = 'UsernameAlreadyExistsError';

  constructor() {
    super('Invalid username, try another');
  }
}

export class LoginOrPasswordInvalidError extends Error {
  public readonly name = 'LoginOrPasswordInvalidError';

  constructor() {
    super('Login or Password is not valid');
  }
}

export class UserIsNotAdminError extends Error {
  public readonly name = 'UserIsNotAdminError';

  constructor() {
    super('You must be an admin');
  }
}

export class UserEmailIsNotVerifiedError extends Error {
  public readonly name = 'UserEmailIsNotVerifiedError';

  constructor(message?: string) {
    super(message || 'Your email must be verified');
  }
}

export class InvalidPasswordError extends Error {
  public readonly name = 'InvalidPasswordError';

  constructor() {
    super(
      'Password must have at least 8 characters between uppercase, lowercase, symbols and numbers',
    );
  }
}

export class InvalidEmailError extends Error {
  public readonly name = 'InvalidEmailError';

  constructor() {
    super('Invalid email');
  }
}

export class InvalidFullNameError extends Error {
  public readonly name = 'InvalidFullNameError';

  constructor() {
    super('Name must be between 2 and 255 characters');
  }
}

export class InvalidTokenError extends Error {
  public readonly name = 'InvalidTokenError';

  constructor(message?: string) {
    super(message || 'Invalid token');
  }
}

export class PasswordMustBeEqualConfirmPasswordError extends Error {
  public readonly name = 'PasswordMustBeEqualConfirmPasswordError';

  constructor() {
    super('Password must be equal confirm password');
  }
}

export class InvalidArticleTextError extends Error {
  public readonly name = 'InvalidArticleTextError';

  constructor() {
    super('Article text must be between 100 and 30000 characters');
  }
}

export class InvalidArticleTitleError extends Error {
  public readonly name = 'InvalidArticleTitleError';

  constructor() {
    super(`Title must be between 5 and 255 characters'`);
  }
}

export class InvalidCategoryNameError extends Error {
  public readonly name = 'InvalidCategoryNameError';

  constructor() {
    super(`Category name must be between 3 and 255 characters`);
  }
}

export class InvalidImageNameError extends Error {
  public readonly name = 'InvalidCategoryNameError';

  constructor() {
    super(`Image name must be in jpeg, png, gif, bmp and webp`);
  }
}

export class InvalidSlugError extends Error {
  public readonly name = 'InvalidSlugError';

  constructor() {
    super('Invalid slug');
  }
}

export class InvalidUsernameError extends Error {
  public readonly name = 'InvalidSlugError';

  constructor() {
    super('Username must be between 2 and 255 characters with no spaces');
  }
}

export class CategoryNameAlreadyExistsError extends Error {
  public readonly name = 'CategoryNameAlreadyExistsError';

  constructor() {
    super('Category already exists');
  }
}

export class CategoryNotFoundError extends Error {
  public readonly name = 'CategoryNotFoundError';

  constructor() {
    super('Category not found');
  }
}

export class CategoryIsRelatedWithArticleError extends Error {
  public readonly name = 'CategoryIsRelatedWithArticleError';

  constructor() {
    super('Category is related with an article');
  }
}

export class ArticleTitleAlreadyExistsError extends Error {
  public readonly name = 'ArticleTitleAlreadyExistsError';

  constructor() {
    super('An article with this title already exists');
  }
}

export class ArticleNotFoundError extends Error {
  public readonly name = 'ArticleNotFoundError';

  constructor() {
    super('Article not found');
  }
}

export class ArticleIsNotYoursError extends Error {
  public readonly name = 'ArticleIsNotYoursError';

  constructor() {
    super('This is not your article, so you cannot change it');
  }
}

export class InvalidForeignKeyError extends Error {
  public readonly name = 'InvalidForeignKeyError';

  constructor() {
    super('Invalid foreign key');
  }
}
