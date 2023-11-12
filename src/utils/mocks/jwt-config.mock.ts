import { IJWTConfig } from 'src/domain/abstracts/config/jwt-config.abstract';

export const jwtMock = (
  tokenMaxAge: number,
  jwtSecret: string,
): IJWTConfig => ({
  getJWTExpirationTime: jest.fn().mockReturnValue(tokenMaxAge),
  getJWTSecret: jest.fn().mockReturnValue(jwtSecret),
  getJWTRefreshTokenExpirationTime: jest.fn().mockReturnValue(tokenMaxAge),
  getJWTRefreshTokenSecret: jest.fn().mockReturnValue(jwtSecret),
});
