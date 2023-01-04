import { Injectable } from '@nestjs/common';
import { IBcrypt } from 'src/domain/abstracts/adapter/bcrypt.abstract';
import { IJwt, IJwtPayload } from 'src/domain/abstracts/adapter/jwt.abstract';
import { IJWTConfig } from 'src/domain/abstracts/config/jwt-config.abstract';
import { IDataServices } from 'src/domain/abstracts/data-services.abstract';
import { IException } from 'src/domain/abstracts/exception-services.abstract';
import { LoginUserDto, RegisterUserDto } from 'src/domain/dtos/user.dto';
import { Cookie } from 'src/domain/models/cookie.model';
import { User } from 'src/domain/models/user.model';

@Injectable()
export class AuthUseCases {
  constructor(
    private dataServices: IDataServices,
    private exception: IException,
    private bcrypt: IBcrypt,
    private jwt: IJwt,
    private config: IJWTConfig,
  ) {}

  async register(registerUserData: RegisterUserDto): Promise<User> {
    const user = await this.dataServices.users.findByEmail(
      registerUserData.email,
    );

    if (user)
      throw this.exception.badRequestException(
        `User with email ${registerUserData.email} already exists`,
      );

    const hashedPassword = await this.bcrypt.hash(registerUserData.password);

    const createdUser = this.dataServices.users.create({
      ...registerUserData,
      password: hashedPassword,
    });

    return createdUser;
  }

  async login(loginData: LoginUserDto): Promise<Cookie> {
    const { email, password } = loginData;

    const user = await this.dataServices.users.findByEmail(email);

    if (!user) {
      throw this.exception.badRequestException('Wrong credentials provided');
    }

    await this.verifyPassword(password, user.password);

    const cookieWithJwtToken = await this.generateCookieWithJwtToken({
      email,
    });

    const { cookieWithRefreshToken, refreshToken } =
      await this.generateCookieWithJwtRefreshToken({
        email,
      });

    const hashedRefreshToken = await this.bcrypt.hash(refreshToken);

    await this.dataServices.users.saveRefreshToken(hashedRefreshToken, email);

    return {
      cookieWithJwtToken,
      cookieWithRefreshToken,
    };
  }

  public async logout(email: string) {
    await this.dataServices.users.removeRefreshToken(email);

    return [
      'Authorization=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }

  public async generateCookieWithJwtToken(payload: IJwtPayload) {
    const maxAge = this.config.getJWTExpirationTime();

    const jwtToken = await this.jwt.createToken(
      payload,
      this.config.getJWTSecret(),
      maxAge,
    );

    return `Authorization=${jwtToken}; HttpOnly; Path=/; Max-Age=${maxAge}`;
  }

  private async generateCookieWithJwtRefreshToken(payload: IJwtPayload) {
    const maxAge = this.config.getJWTRefreshTokenExpirationTime();

    const refreshToken = await this.jwt.createToken(
      payload,
      this.config.getJWTRefreshTokenSecret(),
      maxAge,
    );

    return {
      cookieWithRefreshToken: `Refresh=${refreshToken}; HttpOnly; Path=/; Max-Age=${maxAge}`,
      refreshToken,
    };
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await this.bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );

    if (!isPasswordMatching) {
      throw this.exception.badRequestException('Wrong credentials provided');
    }
  }
}
