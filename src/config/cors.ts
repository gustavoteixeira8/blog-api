import { UnauthorizedError } from '@shared/infra/http/errors/httpErrors';
import { CorsOptions } from 'cors';

const allowedDomains = [
  'https://gustavo.gq',
  process.env.MY_LOCALHOST_IP,
  process.env.MY_LOCALHOST,
];

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
