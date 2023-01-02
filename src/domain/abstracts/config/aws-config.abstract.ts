export abstract class IAWSConfig {
  abstract getCloudWatchGroupName(): string;
  abstract getCloudWatchStreamName(): string;
  abstract getAwsAccessKey(): string;
  abstract getAwsSecretKey(): string;
  abstract getAwsRegion(): string;
}
