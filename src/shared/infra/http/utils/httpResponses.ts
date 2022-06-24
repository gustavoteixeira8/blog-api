import { Body, HttpResponse } from '@shared/core/http/HttpResponse';
import { HttpErrorProtocol } from '@shared/infra/http/errors/httpErrors';
import { Response } from 'express';

// export const created = (data: Body): HttpResponse => {
//   return { body: data, status: 201 };
// };

export const okDiff = (data: Body): HttpResponse => {
  return { body: data, status: 200 };
};

// export const errorResponse = (error: HttpErrorProtocol): HttpResponse => {
//   return {
//     body: {
//       message: error.errors,
//       data: null,
//     },
//     status: error.status,
//   };
// };

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
