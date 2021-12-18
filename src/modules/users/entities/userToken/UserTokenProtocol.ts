import { TimestampProtocol } from '@shared/core/entities/TimestampProtocol';
import { ForeignKeyId } from '@shared/core/entities/valueObjects/ForeignKeyId';
import { Identifier } from '@shared/core/entities/valueObjects/Identifier';
import { TokenJWT } from '@shared/core/entities/valueObjects/TokenJWT';
import { TokenType } from '@shared/core/entities/valueObjects/TokenType';

export interface UserTokenProtocol extends Pick<TimestampProtocol, 'createdAt'> {
  readonly id?: Identifier;
  token: TokenJWT;
  userId: ForeignKeyId;
  expiresIn: Date;
  type: TokenType;
}
