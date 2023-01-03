import { Injectable } from '@nestjs/common';
import { IBcrypt } from 'src/domain/abstracts/adapter/bcrypt.abstract';
import { IJwt, IJwtPayload } from 'src/domain/abstracts/adapter/jwt.abstract';
import { IJWTConfig } from 'src/domain/abstracts/config/jwt-config.abstract';
import { IDataServices } from 'src/domain/abstracts/data-services.abstract';
import { IException } from 'src/domain/abstracts/exception-services.abstract';
import { LoginUserDto, RegisterUserDto } from 'src/domain/dtos/user.dto';
import { Token } from 'src/domain/models/token.model';
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
      throw new this.exception.badRequestException(
        `User with email ${registerUserData.email} already exists`,
      );

    const hashedPassword = await this.bcrypt.hash(registerUserData.password);

    const createdUser = this.dataServices.users.create({
      ...registerUserData,
      password: hashedPassword,
    });

    return createdUser;
  }

  async login(loginData: LoginUserDto): Promise<Token> {
    const { email, password } = loginData;

    const user = await this.getCurrentUser(email, password);

    const { jwtToken, cookieWithJwtToken } = await this.getCookieWithJwtToken({
      email: user.email,
    });

    const { refreshToken, cookieWithRefreshToken } =
      await this.getCookieWithJwtRefreshToken({ email: user.email });

    return {
      cookieWithJwtToken,
      cookieWithRefreshToken,
      jwtToken,
      refreshToken,
    };
  }

  private async getCookieWithJwtToken(payload: IJwtPayload) {
    const jwtToken = await this.generateJwtToken(payload);

    const maxAge = this.config.getJWTExpirationTime();

    const cookieWithJwtToken = `Authorization=${jwtToken}; HttpOnly; Path=/; Max-Age=${maxAge}`;

    return { jwtToken, cookieWithJwtToken };
  }

  private async getCookieWithJwtRefreshToken(payload: IJwtPayload) {
    const refreshToken = await this.generateJwtRefreshToken(payload);

    const maxAge = this.config.getJWTRefreshTokenExpirationTime();

    const cookieWithRefreshToken = `Refresh=${refreshToken}; HttpOnly; Path=/; Max-Age=${maxAge}`;

    return { refreshToken, cookieWithRefreshToken };
  }

  private async generateJwtToken(payload: IJwtPayload) {
    const token = await this.jwt.createToken(
      payload,
      this.config.getJWTSecret(),
      this.config.getJWTExpirationTime(),
    );

    return token;
  }

  private async generateJwtRefreshToken(payload: IJwtPayload) {
    const token = this.jwt.createToken(
      payload,
      this.config.getJWTRefreshTokenSecret(),
      this.config.getJWTRefreshTokenExpirationTime(),
    );

    return token;
  }

  private async getCurrentUser(
    email: string,
    plainTextPassword: string,
  ): Promise<User | null> {
    const user = await this.dataServices.users.findByEmail(email);

    if (!user) {
      throw new this.exception.badRequestException(
        'Wrong credentials provided',
      );
    }

    await this.verifyPassword(plainTextPassword, user.password);

    return user;
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
      throw new this.exception.badRequestException(
        'Wrong credentials provided',
      );
    }
  }
}
