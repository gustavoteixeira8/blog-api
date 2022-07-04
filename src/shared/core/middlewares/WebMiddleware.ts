import { HttpError } from '@shared/infra/http/errors/httpErrors';
import { HttpRequest } from '../http/HttpRequest';

/**
 * Retornar um error do tipo HttpError ou
 * um objeto que será copiado para dentro do objeto de request do Express
 */
export type MiddlewareResponse = HttpError | Record<string, any>;

export interface WebMiddleware {
  handleMiddleware(httpRequest: HttpRequest): Promise<MiddlewareResponse>;
}
