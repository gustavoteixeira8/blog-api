import { HttpError } from '@shared/core/http/httpErrors';
import { HttpResponse } from '@shared/core/http/HttpResponse';
import { NextFunction, Request, Response } from 'express';

export const catchErrorsInRoutes = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction, // eslint-disable-line
): Response => {
  if (err instanceof HttpError) {
    const httpError: HttpResponse = {
      body: { message: err.errors, data: null },
      status: err.status,
    };
    return res.status(err.status).json(httpError);
  }

  const undefinedError: HttpResponse = {
    body: { message: 'Internal server error', data: null },
    status: 500,
  };

  return res.status(500).json(undefinedError);
};
