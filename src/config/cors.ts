// import { UnauthorizedError } from '@shared/infra/http/errors/httpErrors';
import { UnauthorizedError } from '@shared/core/http/httpErrors';
import { CorsOptions } from 'cors';

const allowedDomains = ['https://gustavoteixeira.xyz', 'https://blog.gustavoteixeira.xyz'];

export const corsConfig = {
  origin: (origin, cb) => {
    if (!allowedDomains.includes(origin || 'WRONG_ORIGIN')) {
      cb(new UnauthorizedError('Not allowed by CORS'));
      return;
    }

    cb(null, origin);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
} as CorsOptions;
