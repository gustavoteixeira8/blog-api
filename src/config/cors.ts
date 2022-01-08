import { UnauthorizedError } from '@shared/infra/http/errors/httpErrors';
import { CorsOptions } from 'cors';

const allowedDomains = [
  'https://api.gustavo.gq',
  'http://localhost:3000',
  process.env.MY_LOCALHOST_IP,
];

export const corsConfig = {
  origin: (origin, cb) => {
    if (origin && !allowedDomains.includes(origin)) {
      cb(new UnauthorizedError('Not allowed by CORS'));
      return;
    }

    cb(null, origin);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
} as CorsOptions;
