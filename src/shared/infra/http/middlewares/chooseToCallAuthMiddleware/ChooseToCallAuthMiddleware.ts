import { HttpRequest } from '@shared/core/http/HttpRequest';
import { MiddlewareResponse, WebMiddleware } from '@shared/core/middlewares/WebMiddleware';

export class ChooseToCallAuthMiddleware extends WebMiddleware {
  constructor(private ensureAuthMiddleware: WebMiddleware) {
    super();
  }

  protected async handleMiddleware(httpRequest: HttpRequest): Promise<MiddlewareResponse> {
    const authExists = httpRequest.headers.authorization;

    if (!authExists) return {};

    const tokenExists = authExists.split(' ')[1];

    if (!tokenExists) return {};

    return this.ensureAuthMiddleware.handle(httpRequest);
  }
}
