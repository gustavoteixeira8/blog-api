import { OrderByProtocol } from '../repositories/PaginationProtocol';
import { UseCaseProtocol } from '../useCases/UseCaseProtocol';
import { HttpRequest } from '../http/HttpRequest';
import { HttpResponse } from '../http/HttpResponse';
import {
  DefaultObject,
  ResolveBooleanResponse,
  ResolveDateResponse,
  ResolveNumbersResponse,
  ResolveStringsResponse,
} from './Responses';

export abstract class WebController {
  public abstract handleRequest(httpRequest: HttpRequest): Promise<HttpResponse>;

  constructor(protected _useCase: UseCaseProtocol<any, any>) {}

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
    console.log(str);

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
