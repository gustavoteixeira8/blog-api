"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveOrderByParams = resolveOrderByParams;
exports.resolveSearchParamsBoolean = resolveSearchParamsBoolean;
exports.resolveSearchParamsDate = resolveSearchParamsDate;
exports.resolveSearchParamsNumbers = resolveSearchParamsNumbers;
exports.resolveSearchParamsStrings = resolveSearchParamsStrings;

function resolveSearchParamsNumbers(object) {
  const result = {};

  for (const key in object) {
    const keyAsNumber = Number(object[key]);
    const isNaN = Number.isNaN(keyAsNumber);
    result[key] = isNaN ? undefined : keyAsNumber;
  }

  return result;
}

function resolveSearchParamsStrings(object) {
  const result = {};

  for (const key in object) {
    if (typeof object[key] === 'string') {
      result[key] = object[key];
    }
  }

  return result;
}

function resolveSearchParamsBoolean(object) {
  const result = {};

  for (const key in object) {
    if (object[key] === 'true' || object[key] === '1') {
      result[key] = true;
    } else if (object[key] === 'false' || object[key] === '0') {
      result[key] = false;
    }
  }

  return result;
}

function resolveSearchParamsDate(object) {
  const result = {};

  for (const key in object) {
    const newDate = new Date(object[key]);
    result[key] = Number.isNaN(newDate.getTime()) ? undefined : newDate;
  }

  return result;
}

function resolveOrderByParams(str) {
  const result = {};
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