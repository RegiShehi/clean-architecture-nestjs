import { WinstonModule } from 'nest-winston';
import { EnvironmentConfigService } from 'src/services/configuration/environment-config.service';
import winston, { format } from 'winston';
import CloudWatchTransport from 'winston-cloudwatch';

const { combine, timestamp, printf, colorize } = format;

const myFormat = printf(({ message, timestamp, context }) => {
  return `${timestamp} | ${message} | ${context ?? 'Context not defined'}`;
});

export const WinstonLoggerConfig = (config: EnvironmentConfigService) => {
  const env = process.env.NODE_ENV;

  if (env === 'production') {
    return WinstonModule.createLogger({
      level: 'info',
      transports: [
        new CloudWatchTransport({
          name: 'Cloudwatch Logs',
          logGroupName: config.getCloudWatchGroupName(),
          logStreamName: config.getCloudWatchStreamName(),
          awsOptions: {
            credentials: {
              accessKeyId: config.getAwsAccessKey(),
              secretAccessKey: config.getAwsSecretKey(),
            },
            region: config.getAwsRegion(),
          },
          messageFormatter: ({ message, context, stack }) =>
            `${message} | ${context ?? 'Context not defined'} | ${
              stack ?? 'Stack not defined'
            }`,
        }),
      ],
    });
  } else {
    return WinstonModule.createLogger({
      level: 'info',
      transports: [
        new winston.transports.Console({
          format: combine(colorize({ all: true }), timestamp(), myFormat),
        }),
      ],
    });
  }
};
