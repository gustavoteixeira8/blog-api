import { SanitizerAdapterProtocol } from '@shared/adapters/sanitizerAdapter/SanitizerAdapterProtocol';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { MiddlewareResponse, WebMiddleware } from '@shared/core/middlewares/WebMiddleware';

export class SanitizeBodyMiddleware extends WebMiddleware {
  constructor(private _sanitizerAdapter: SanitizerAdapterProtocol) {
    super();
  }

  protected async handleMiddleware(httpRequest: HttpRequest): Promise<MiddlewareResponse> {
    const body = httpRequest.body;

    if (body && Object.keys(body).length) {
      for (const key in body) {
        body[key] = this._sanitizerAdapter.sanitize(body[key]);
      }
    }

    return {};
  }
}
