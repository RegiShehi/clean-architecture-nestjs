export interface IJwtPayload {
  email: string;
}

export abstract class IJwt {
  abstract checkToken(token: string): Promise<any>;
  abstract createToken(
    payload: IJwtPayload,
    secret: string,
    expiresIn: string,
  ): Promise<string>;
}
