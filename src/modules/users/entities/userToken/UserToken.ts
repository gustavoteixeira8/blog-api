import { UserTokenDTO } from '@modules/users/dtos/UserTokenDTO';
import { Entity } from '@shared/core/entities/Entity';
import { ForeignKeyId } from '@shared/core/entities/valueObjects/ForeignKeyId';
import { Identifier } from '@shared/core/entities/valueObjects/Identifier';
import { TokenJWT } from '@shared/core/entities/valueObjects/TokenJWT';
import { TokenType } from '@shared/core/entities/valueObjects/TokenType';
import { EntityError } from '@shared/core/errors';
import { UserTokenProtocol } from './UserTokenProtocol';

export class UserToken extends Entity<UserTokenProtocol> implements UserTokenProtocol {
  private _token: TokenJWT;
  private _type: TokenType;
  private _userId: ForeignKeyId;
  private _expiresIn: Date;
  private _createdAt: Date;

  get token(): TokenJWT {
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

  public static create(props: UserTokenDTO): UserToken {
    const tokenOrError = {
      id: Identifier.create(props.id),
      token: TokenJWT.create(props.token) as TokenJWT,
      userId: ForeignKeyId.create(props.userId) as ForeignKeyId,
      type: props.type as TokenType,
      expiresIn: props.expiresIn,
      createdAt: props.createdAt || new Date(),
    };
    const errors: string[] = [];

    for (const key in tokenOrError) {
      if (tokenOrError[key] instanceof Error) {
        errors.push(tokenOrError[key].message);
      }
    }

    if (errors.length) throw new EntityError(...errors);

    const isNewToken = !props.id;

    if (!this.expiresInFuture(props.expiresIn, isNewToken)) {
      throw new EntityError('Expires in must be in future');
    }

    if (!this.isValidType(props.type)) {
      throw new EntityError('Token type is invalid');
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
