import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { Email } from '@shared/core/entities/valueObjects/Email';
import { DateAdapterProtocol } from '@shared/adapters/dateAdapter/DateAdapterProtocol';
import { HashAdapterProtocol } from '@shared/adapters/hashAdapter/HashAdapterProtocol';
import { TokenAdapterProtocol } from '@shared/adapters/tokenAdapter/TokenAdapterProtocol';
import { User } from '../entities/user/User';
import { UserRepositoryProtocol } from '../repositories/UserRepositoryProtocol';
import { LoginOrPasswordInvalidError, MissingParamError } from '@shared/core/errors';

export interface AuthenticationRequest {
  login: string;
  password: string;
}

export interface AuthenticationResponse {
  accessToken: string;
  expiresIn: Date;
  userId: string;
  userIsRecovered: boolean;
}

export class AuthenticateUserUseCase
  implements UseCaseProtocol<AuthenticationRequest, Promise<AuthenticationResponse>>
{
  constructor(
    private readonly _userRepository: UserRepositoryProtocol,
    private readonly _tokenAdapter: TokenAdapterProtocol,
    private readonly _dateAdapter: DateAdapterProtocol,
    private readonly _hashAdapter: HashAdapterProtocol,
  ) {}

  public async execute({
    login,
    password,
  }: AuthenticationRequest): Promise<AuthenticationResponse> {
    if (!login || !password) throw new MissingParamError('Login and password');

    const isEmail = Email.validate(login);
    let user: User | undefined;

    if (isEmail) {
      user = await this._userRepository.findByEmail(login, { withDeleted: true });
    } else {
      user = await this._userRepository.findByUsername(login, { withDeleted: true });
    }

    if (!user) throw new LoginOrPasswordInvalidError();

    if (!user.isEmailVerified) throw new LoginOrPasswordInvalidError();

    const isValidPassword = await this._hashAdapter.compare(password, user.password.value);

    if (!isValidPassword) throw new LoginOrPasswordInvalidError();

    const tokenExpiresIn = this._dateAdapter.add(new Date(), { days: 1 });
    const accessToken = this._tokenAdapter.sign(
      { id: user.id.value, expiresIn: tokenExpiresIn },
      { expiresIn: '1d' },
    );

    const userIsDeleted = !!user.deletedAt;

    if (userIsDeleted) {
      user.recover();
      await this._userRepository.recover(user.id.value);
    }

    return {
      accessToken,
      expiresIn: tokenExpiresIn,
      userId: user.id.value,
      userIsRecovered: userIsDeleted !== !!user.deletedAt,
    };
  }
}
