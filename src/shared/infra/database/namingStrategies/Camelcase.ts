import camelcase from 'camelcase';
import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';

export class CamelcaseStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  public columnName(propertyName: string): string {
    return camelcase(propertyName);
  }

  public tableName(targetName: string, userSpecifiedName: string | undefined): string {
    if (userSpecifiedName) {
      return camelcase(userSpecifiedName);
    }

    return camelcase(targetName);
  }
}
