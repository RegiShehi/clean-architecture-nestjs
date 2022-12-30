export abstract class IEnvironmentConfig {
  abstract getDatabaseHost(): string;
  abstract getDatabasePort(): number;
  abstract getDatabaseUser(): string;
  abstract getDatabasePassword(): string;
  abstract getDatabaseName(): string;
  abstract getServerPort(): number;

  abstract getCloudWatchGroupName(): string;
  abstract getCloudWatchStreamName(): string;
  abstract getAwsAccessKey(): string;
  abstract getAwsSecretKey(): string;
  abstract getAwsRegion(): string;
}
