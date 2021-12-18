import { OrderByProtocol } from '@shared/core/repositories/PaginationProtocol';

export type ResolveNumbersResponse = Record<string, number | undefined>;
export type ResolveDateResponse = Record<string, Date | undefined>;
export type ResolveStringsResponse = Record<string, string | undefined>;
export type ResolveBooleanResponse = Record<string, boolean>;
export type DefaultObject = Record<string, any>;

export function resolveSearchParamsNumbers(object: DefaultObject): ResolveNumbersResponse {
  const result: ResolveNumbersResponse = {};

  for (const key in object) {
    const keyAsNumber = Number(object[key]);
    const isNaN = Number.isNaN(keyAsNumber);

    result[key] = isNaN ? undefined : keyAsNumber;
  }

  return result;
}

export function resolveSearchParamsStrings(object: DefaultObject): ResolveStringsResponse {
  const result: ResolveStringsResponse = {};

  for (const key in object) {
    if (typeof object[key] === 'string') {
      result[key] = object[key];
    }
  }

  return result;
}

export function resolveSearchParamsBoolean(object: DefaultObject): ResolveBooleanResponse {
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

export function resolveSearchParamsDate(object: DefaultObject): ResolveDateResponse {
  const result: ResolveDateResponse = {};

  for (const key in object) {
    const newDate = new Date(object[key]);

    result[key] = Number.isNaN(newDate.getTime()) ? undefined : newDate;
  }

  return result;
}

export function resolveOrderByParams(str: any): OrderByProtocol {
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
