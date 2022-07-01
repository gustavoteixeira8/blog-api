import { HttpErrorProtocol } from '@shared/infra/http/errors/httpErrors';
import { Response } from 'express';

export const created = (res: Response, data: any): Response => {
  return res.status(201).json({ body: data, status: 201 });
};

export const ok = (res: Response, data: any): Response => {
  return res.status(200).json({ body: data, status: 200 });
};

export const noContent = (res: Response): Response => {
  return res.status(204).json(null);
};

export const errorResponse = (res: Response, error: HttpErrorProtocol): Response => {
  return res.status(error.status).json({
    body: {
      errors: error.errors,
    },
    status: error.status,
  });
};
