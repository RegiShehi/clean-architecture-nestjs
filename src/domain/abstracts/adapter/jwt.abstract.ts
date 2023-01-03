export interface IJwtPayload {
  email: string;
}

export abstract class IJwt {
  abstract createToken(
    payload: IJwtPayload,
    secret: string,
    expiresIn: string,
  ): Promise<string>;
}
