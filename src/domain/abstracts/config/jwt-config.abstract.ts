export abstract class IJWTConfig {
  abstract getJWTSecret(): string;
  abstract getJWTExpirationTime(): string;
  abstract getJWTRefreshTokenSecret(): string;
  abstract getJWTRefreshTokenExpirationTime(): string;
}
