import { HttpRequest } from '@shared/core/http/HttpRequest';
import { WebController } from '@shared/core/controllers/WebController';
import { Request, Response } from 'express';

export const controllerAdapter = (webController: WebController) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      userData: req.userData,
    };
    const httpResponse = await webController.handleRequest(httpRequest);
    return res.status(httpResponse.status).json(httpResponse.body);
  };
};
