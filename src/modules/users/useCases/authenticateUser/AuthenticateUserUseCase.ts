import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { Email } from '@shared/core/valueObjects/Email';
import { DateAdapterProtocol } from '@shared/adapters/dateAdapter/DateAdapterProtocol';
import { HashAdapterProtocol } from '@shared/adapters/hashAdapter/HashAdapterProtocol';
import { TokenAdapterProtocol } from '@shared/adapters/tokenAdapter/TokenAdapterProtocol';
import { User } from '../../entities/user/User';
import { UserRepositoryProtocol } from '../../repositories/UserRepositoryProtocol';
import { LoginOrPasswordInvalidError, MissingParamError } from '@shared/core/errors';
import { RedisAuthStorageProtocol } from '@modules/users/cache/auth/RedisAuthStorageProtocol';

export interface AuthRequest {
  login: string;
  password: string;
}

export type AuthResponse =
  | {
      accessToken: string;
      expiresIn: Date;
      userId: string;
      userIsRecovered: boolean;
    }
  | LoginOrPasswordInvalidError
  | MissingParamError;

export class AuthenticateUserUseCase
  implements UseCaseProtocol<AuthRequest, Promise<AuthResponse>>
{
  constructor(
    private readonly _userRepository: UserRepositoryProtocol,
    private readonly _redisAuthStorage: RedisAuthStorageProtocol,
    private readonly _tokenAdapter: TokenAdapterProtocol,
    private readonly _dateAdapter: DateAdapterProtocol,
    private readonly _hashAdapter: HashAdapterProtocol,
  ) {}

  public async execute({ login, password }: AuthRequest): Promise<AuthResponse> {
    if (!login || !password) return new MissingParamError('Login and password');

    const isEmail = Email.validate(login);
    let user: User | undefined;

    if (isEmail) {
      user = await this._userRepository.findByEmail(login, { withDeleted: true });
    } else {
      user = await this._userRepository.findByUsername(login, { withDeleted: true });
    }

    if (!user) return new LoginOrPasswordInvalidError();

    if (!user.isEmailVerified) return new LoginOrPasswordInvalidError();

    const isValidPassword = await this._hashAdapter.compare(password, user.password.value);

    if (!isValidPassword) return new LoginOrPasswordInvalidError();

    const userIsDeleted = !!user.deletedAt;

    if (userIsDeleted) {
      user.recover();
      await this._userRepository.recover(user.id.value);
    }

    const accessTokenStored = await this._redisAuthStorage.getToken(user.id.value);

    if (accessTokenStored) {
      const tokenIsExpired = this._dateAdapter.isAfter(
        new Date(),
        new Date(accessTokenStored?.expiresIn),
      );

      if (!tokenIsExpired) {
        return {
          accessToken: accessTokenStored.accessToken,
          expiresIn: accessTokenStored.expiresIn,
          userId: user.id.value,
          userIsRecovered: false,
        };
      }
    }

    const tokenExpiresIn = this._dateAdapter.add(new Date(), { days: 1 });
    const accessToken = this._tokenAdapter.sign(
      { id: user.id.value, expiresIn: tokenExpiresIn },
      { expiresIn: '1d' },
    );

    await this._redisAuthStorage.saveToken({
      accessToken,
      userId: user.id.value,
      expiresIn: tokenExpiresIn,
    });

    return {
      accessToken,
      expiresIn: tokenExpiresIn,
      userId: user.id.value,
      userIsRecovered: userIsDeleted !== !!user.deletedAt,
    };
  }
}
