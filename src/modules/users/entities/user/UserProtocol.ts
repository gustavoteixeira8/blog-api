import { Username } from '@shared/core/valueObjects/Username';
import { TimestampProtocol } from '@shared/core/entities/TimestampProtocol';
import { Email } from '@shared/core/valueObjects/Email';
import { Identifier } from '@shared/core/valueObjects/Identifier';
import { Password } from '@shared/core/valueObjects/Password';
import { PersonName } from '@shared/core/valueObjects/PersonName';

export interface UserProtocol extends TimestampProtocol {
  readonly id?: Identifier;
  fullName: PersonName;
  email: Email;
  username: Username;
  password: Password;
  isAdmin: boolean;
  isEmailVerified: boolean;
}
