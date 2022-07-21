import { UserTokenDTO } from '@modules/users/dtos/UserTokenDTO';
import { Entity } from '@shared/core/entities/Entity';
import { ForeignKeyId } from '@shared/core/valueObjects/ForeignKeyId';
import { Identifier } from '@shared/core/valueObjects/Identifier';
import { TokenSpecific } from '@shared/core/valueObjects/TokenSpecific';
import { TokenType } from '@shared/core/valueObjects/TokenType';
import { TokenMustBeSpecificTypeError, TokenMustExpiresInFutureError } from '@shared/core/errors';
import { UserTokenProtocol } from './UserTokenProtocol';

export type UserTokenCreateResponse =
  | UserToken
  | TokenMustBeSpecificTypeError
  | TokenMustExpiresInFutureError;

export class UserToken extends Entity<UserTokenProtocol> implements UserTokenProtocol {
  private _token: TokenSpecific;
  private _type: TokenType;
  private _userId: ForeignKeyId;
  private _expiresIn: Date;
  private _createdAt: Date;

  get token(): TokenSpecific {
    return this._token;
  }
  get type(): TokenType {
    return this._type;
  }
  get userId(): ForeignKeyId {
    return this._userId;
  }
  get expiresIn(): Date {
    return this._expiresIn;
  }
  get createdAt(): Date {
    return this._createdAt;
  }

  private constructor(props: UserTokenProtocol) {
    super(props);
    this._token = props.token;
    this._userId = props.userId;
    this._expiresIn = props.expiresIn;
    this._type = props.type;
    this._createdAt = props.createdAt || new Date();
  }

  public static create(props: UserTokenDTO): UserTokenCreateResponse {
    const tokenOrError = {
      id: Identifier.create(props.id),
      token: TokenSpecific.create(props.token) as TokenSpecific,
      userId: ForeignKeyId.create(props.userId) as ForeignKeyId,
      type: props.type as TokenType,
      expiresIn: props.expiresIn,
      createdAt: props.createdAt || new Date(),
    };

    for (const key in tokenOrError) {
      if (tokenOrError[key] instanceof Error) {
        return tokenOrError[key];
      }
    }

    const isNewToken = !props.id;

    if (!this.expiresInFuture(props.expiresIn, isNewToken)) {
      return new TokenMustExpiresInFutureError();
    }

    if (!this.isValidType(props.type)) {
      return new TokenMustBeSpecificTypeError();
    }

    return new UserToken(tokenOrError);
  }

  private static isValidType(type: string): boolean {
    const typesOfToken: TokenType[] = ['verifyEmail', 'updatePassword'];

    return typesOfToken.findIndex((value) => value === type) !== -1;
  }

  private static expiresInFuture(expiresIn: Date, firstCreation: boolean): boolean {
    if (!firstCreation) return true;

    if (!(expiresIn instanceof Date)) return false;

    const dateInMs = expiresIn.getTime();
    const now = new Date().getTime();

    if (now > dateInMs) return false;

    return true;
  }
}
