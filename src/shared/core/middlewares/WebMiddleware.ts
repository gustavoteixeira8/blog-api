import { HttpError, InternalServerError } from '../http/httpErrors';
import { HttpRequest } from '../http/HttpRequest';

/**
 * Retornar um error do tipo HttpError ou
 * um objeto que será copiado para dentro do objeto de request do Express
 */
export type MiddlewareResponse = HttpError | Record<string, any>;

export abstract class WebMiddleware {
  protected abstract handleMiddleware(httpRequest: HttpRequest): Promise<MiddlewareResponse>;

  public async handle(httpRequest: HttpRequest): Promise<MiddlewareResponse> {
    try {
      return await this.handleMiddleware(httpRequest);
    } catch (error) {
      return new InternalServerError();
    }
  }
}
