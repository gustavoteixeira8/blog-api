import { Username } from '@shared/core/valueObjects/Username';
import { Entity } from '@shared/core/entities/Entity';
import { Email } from '@shared/core/valueObjects/Email';
import { Password } from '@shared/core/valueObjects/Password';
import { PersonName } from '@shared/core/valueObjects/PersonName';
import {
  InvalidEmailError,
  InvalidFullNameError,
  InvalidPasswordError,
  InvalidUsernameError,
} from '@shared/core/errors';
import { UserProtocol } from './UserProtocol';
import { Identifier } from '@shared/core/valueObjects/Identifier';
import { UserDTO } from '@modules/users/dtos/UserDTO';

export type UserCreateResponse =
  | InvalidEmailError
  | InvalidFullNameError
  | InvalidPasswordError
  | InvalidUsernameError
  | User;

export class User extends Entity<UserProtocol> implements UserProtocol {
  private _fullName: PersonName;
  private _email: Email;
  private _username: Username;
  private _password: Password;
  private _isAdmin: boolean;
  private _isEmailVerified: boolean;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _deletedAt: Date | null;

  get fullName(): PersonName {
    return this._fullName;
  }
  get email(): Email {
    return this._email;
  }
  get username(): Username {
    return this._username;
  }
  get password(): Password {
    return this._password;
  }
  get isAdmin(): boolean {
    return this._isAdmin;
  }
  get isEmailVerified(): boolean {
    return this._isEmailVerified;
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

  private constructor(props: UserProtocol) {
    super(props);
    this._fullName = props.fullName;
    this._email = props.email;
    this._username = props.username;
    this._password = props.password;
    this._isAdmin = props.isAdmin;
    this._isEmailVerified = props.isEmailVerified;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
    this._deletedAt = props.deletedAt;
  }

  public static create(props: UserDTO): UserCreateResponse {
    const isNewUser = !props.id;
    const dateNow = new Date();

    const userOrError = {
      id: Identifier.create(props.id),
      fullName: PersonName.create(props.fullName) as PersonName,
      email: Email.create(props.email) as Email,
      username: Username.create(props.username) as Username,
      password: Password.create(props.password, !isNewUser) as Password,
      isAdmin: props.isAdmin,
      isEmailVerified: isNewUser ? false : props.isEmailVerified,
      createdAt: !props.createdAt ? dateNow : props.createdAt,
      updatedAt: !props.updatedAt ? dateNow : props.updatedAt,
      deletedAt: !props.deletedAt ? null : props.deletedAt,
    };

    for (const key in userOrError) {
      if (userOrError[key] instanceof Error) {
        return userOrError[key];
      }
    }

    return new User(userOrError);
  }

  public delete(): void {
    if (this._deletedAt) return;

    const date = new Date();

    this._deletedAt = date;
    this._updatedAt = date;
  }

  public recover(): void {
    if (!this._deletedAt) return;

    this._deletedAt = null;
    this._updatedAt = new Date();
  }

  public updateFullName(name: PersonName): void {
    if (this._fullName.equals(name)) {
      return;
    }

    this._fullName = name;
    this._updatedAt = new Date();
  }

  public updateEmail(email: Email): void {
    if (this._email.equals(email)) {
      return;
    }

    this._email = email;
    this._updatedAt = new Date();
    this.uncheckVerifyEmail();
  }

  public updateUsername(username: Username): void {
    if (this._username.equals(username)) {
      return;
    }

    this._username = username;
    this._updatedAt = new Date();
  }

  public updatePassword(password: Password): void {
    if (this._password.equals(password)) {
      return;
    }

    this._password = password;
    this._updatedAt = new Date();
  }

  public makeAdmin(): void {
    this._isAdmin = true;
    this._updatedAt = new Date();
  }

  public removeAdmin(): void {
    this._isAdmin = false;
    this._updatedAt = new Date();
  }

  public verifyEmail(): void {
    if (!this._isEmailVerified) {
      this._isEmailVerified = true;
      this._updatedAt = new Date();
    }
  }

  public uncheckVerifyEmail(): void {
    if (this._isEmailVerified) {
      this._isEmailVerified = false;
      this._updatedAt = new Date();
    }
  }
}
