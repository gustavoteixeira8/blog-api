import { compare, hash } from 'bcrypt';
import { HashProviderProtocol } from '../HashProviderProtocol';

export class BCryptProvider implements HashProviderProtocol {
  private readonly defaultSalt = 8;

  public generate(s: string): Promise<string> {
    return hash(s, this.defaultSalt);
  }

  public compare(s: string, hash: string): Promise<boolean> {
    return compare(s, hash);
  }
}
