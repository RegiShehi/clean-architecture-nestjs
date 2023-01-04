export abstract class IJWTConfig {
  abstract getJWTSecret(): string;
  abstract getJWTExpirationTime(): number;
  abstract getJWTRefreshTokenSecret(): string;
  abstract getJWTRefreshTokenExpirationTime(): number;
}
