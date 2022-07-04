import { TimestampProtocol } from '@shared/core/entities/TimestampProtocol';
import { ForeignKeyId } from '@shared/core/valueObjects/ForeignKeyId';
import { Identifier } from '@shared/core/valueObjects/Identifier';
import { TokenJWT } from '@shared/core/valueObjects/TokenJWT';
import { TokenType } from '@shared/core/valueObjects/TokenType';

export interface UserTokenProtocol extends Pick<TimestampProtocol, 'createdAt'> {
  readonly id?: Identifier;
  token: TokenJWT;
  userId: ForeignKeyId;
  expiresIn: Date;
  type: TokenType;
}
