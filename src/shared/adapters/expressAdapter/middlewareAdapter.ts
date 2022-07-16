import { HttpError } from '@shared/infra/http/errors/httpErrors';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { defaultResponse } from '@shared/core/http/HttpResponse';
import { WebMiddleware } from '@shared/core/middlewares/WebMiddleware';
import { NextFunction, Request, Response } from 'express';

export const middlewareAdapter = (webMiddleware: WebMiddleware) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const httpRequest: HttpRequest = {
      headers: req.headers,
      body: req.body,
      params: req.params,
      query: req.query,
      file: req.file,
      userData: req.userData,
    };
    const middleware = await webMiddleware.handle(httpRequest);

    if (middleware instanceof HttpError) {
      return res
        .status(middleware.status)
        .json(defaultResponse({ message: middleware.errors, status: middleware.status }));
    }

    for (const key in middleware) {
      req[key] = middleware[key];
    }

    return next();
  };
};
