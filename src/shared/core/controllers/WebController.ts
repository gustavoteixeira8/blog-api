import { OrderByProtocol } from '../repositories/PaginationProtocol';
import { UseCaseProtocol } from '../useCases/UseCaseProtocol';
import { HttpRequest } from '../http/HttpRequest';
import { HttpResponse, serverError } from '../http/HttpResponse';
import { logger } from '@shared/log';

export type ResolveNumbersResponse = Record<string, number | undefined>;
export type ResolveDateResponse = Record<string, Date | undefined>;
export type ResolveStringsResponse = Record<string, string | undefined>;
export type ResolveBooleanResponse = Record<string, boolean>;
export type DefaultObject = Record<string, any>;

export abstract class WebController<T = UseCaseProtocol<any, any>> {
  protected abstract handleRequest(httpRequest: HttpRequest): Promise<HttpResponse>;

  constructor(protected _useCase: T) {}

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      return await this.handleRequest(httpRequest);
    } catch (error) {
      logger.error(error);
      return serverError({ message: 'Internal error' });
    }
  }

  protected isTypeofErrors(value: any, ...errors: string[]): value is Error {
    for (const errorName of errors) {
      if (value instanceof Error && value.name === errorName) {
        return true;
      }
    }
    return false;
  }

  protected resolveQueryNumbers(object: ResolveNumbersResponse) {
    const result: ResolveNumbersResponse = {};

    for (const key in object) {
      const keyAsNumber = Number(object[key]);
      const isNaN = Number.isNaN(keyAsNumber);

      result[key] = isNaN ? undefined : keyAsNumber;
    }

    return result;
  }

  protected resolveQueryStrings(object: DefaultObject): ResolveStringsResponse {
    const result: ResolveStringsResponse = {};

    for (const key in object) {
      if (typeof object[key] === 'string') {
        result[key] = object[key];
      }
    }

    return result;
  }

  protected resolveQueryBoolean(object: DefaultObject): ResolveBooleanResponse {
    const result: ResolveBooleanResponse = {};

    for (const key in object) {
      if (object[key] === 'true' || object[key] === '1') {
        result[key] = true;
      } else if (object[key] === 'false' || object[key] === '0') {
        result[key] = false;
      }
    }

    return result;
  }

  protected resolveQueryDate(object: DefaultObject): ResolveDateResponse {
    const result: ResolveDateResponse = {};

    for (const key in object) {
      const newDate = new Date(object[key]);

      result[key] = Number.isNaN(newDate.getTime()) ? undefined : newDate;
    }

    return result;
  }

  protected resolveQueryOrderBy(str: any): OrderByProtocol {
    const result: OrderByProtocol = {};

    if (typeof str === 'undefined') return result;
    if (Array.isArray(str)) str = str[0];

    if (str.startsWith('-')) {
      const strSplitted = str.split('-')[1];

      result[strSplitted] = 'ASC';
    } else if (str.startsWith('+')) {
      const strSplitted = str.split('+')[1];

      result[strSplitted] = 'DESC';
    } else {
      result[str] = 'DESC';
    }

    return result;
  }
}
