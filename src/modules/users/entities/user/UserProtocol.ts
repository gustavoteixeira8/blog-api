import { Username } from '@shared/core/entities/valueObjects/Username';
import { TimestampProtocol } from '@shared/core/entities/TimestampProtocol';
import { Email } from '@shared/core/entities/valueObjects/Email';
import { Identifier } from '@shared/core/entities/valueObjects/Identifier';
import { Password } from '@shared/core/entities/valueObjects/Password';
import { PersonName } from '@shared/core/entities/valueObjects/PersonName';

export interface UserProtocol extends TimestampProtocol {
  readonly id?: Identifier;
  fullName: PersonName;
  email: Email;
  username: Username;
  password: Password;
  isAdmin: boolean;
  isEmailVerified: boolean;
}
