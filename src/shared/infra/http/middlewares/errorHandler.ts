import { convertErrorsToHttpError } from '@shared/infra/http/errors/convertErrorsToHttpError';
import { EntityError } from '@shared/core/errors';
import { HttpError } from '@shared/infra/http/errors/httpErrors';
import { NextFunction, Request, Response } from 'express';
import { errorResponse } from '../utils/httpResponses';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction, // eslint-disable-line
): Response {
  console.log(error);

  if (error instanceof HttpError) {
    return errorResponse(res, { errors: error.errors, status: error.status });
  }

  if (error instanceof EntityError) {
    return errorResponse(res, { errors: error.messages, status: 400 });
  }

  const handleError = convertErrorsToHttpError(error);

  return errorResponse(res, { errors: handleError.errors, status: handleError.status });
}
