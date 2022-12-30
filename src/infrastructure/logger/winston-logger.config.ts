import { WinstonModule } from 'nest-winston';
import winston, { format } from 'winston';

const { combine, timestamp, printf, colorize } = format;

const myFormat = printf(({ message, timestamp, context }) => {
  return `${timestamp} | ${context ?? 'Not defined'} | ${message} `;
});

export const WinstonLoggerConfig = WinstonModule.createLogger({
  level: process.env.NODE_ENV !== 'production' ? 'error' : 'info',
  transports: [
    new winston.transports.Console({
      format: combine(colorize({ all: true }), timestamp(), myFormat),
    }),
  ],
});
