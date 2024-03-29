import { HttpRequest } from '@shared/core/http/HttpRequest';
import { WebController } from '@shared/core/controllers/WebController';
import { Request, Response } from 'express';

export const controllerAdapter = (webController: WebController) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      headers: req.headers,
      body: req.body,
      params: req.params,
      query: req.query,
      file: req.file,
      userData: req.userData,
    };
    const httpResponse = await webController.handle(httpRequest);
    return res.status(httpResponse.status).json(httpResponse);
  };
};
