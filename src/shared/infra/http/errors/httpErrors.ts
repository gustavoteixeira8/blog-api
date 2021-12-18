export interface HttpErrorProtocol {
  errors: string[];
  status: number;
}

export abstract class HttpError extends Error {
  public abstract readonly status: number;
  public abstract readonly name: string;
  public readonly errors: string[];

  constructor(...errors: string[]) {
    super();
    this.errors = errors;
    Error.captureStackTrace(this);
    Object.assign(Error.prototype, HttpError.prototype);
  }
}

export class BadRequestError extends HttpError {
  public readonly status: number = 400;
  public readonly name: string = 'BadRequestError';
}

export class NotFoundError extends HttpError {
  public readonly status: number = 404;
  public readonly name: string = 'NotFoundError';
}

export class UnauthorizedError extends HttpError {
  public readonly status: number = 401;
  public readonly name: string = 'UnauthorizedError';
}

export class ForbiddenError extends HttpError {
  public readonly status: number = 403;
  public readonly name: string = 'ForbiddenError';
}

export class TooManyRequestsError extends HttpError {
  public readonly status: number = 429;
  public readonly name: string = 'TooManyRequestsError';
}

export class InternalServerError extends HttpError {
  public readonly status: number = 500;
  public readonly name: string = 'InternalServerError';

  constructor() {
    super('Internal server error');
  }
}
