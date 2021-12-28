import { SanitizeHtmlProvider } from '@shared/providers/sanitizerProvider/implementations/SanitizeHtmlProvider';
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

export function sanitizeBody(req: Request, res: Response, next: NextFunction): void {
  const sanitizer = container.resolve(SanitizeHtmlProvider);
  const body = req.body;

  if (body && Object.keys(body).length) {
    for (const key in body) {
      body[key] = sanitizer.sanitize(body[key]);
    }
  }

  return next();
}
