import pino from 'pino';
import { loggerConfig } from '@config/logger';

export const logger = pino({ ...loggerConfig });
