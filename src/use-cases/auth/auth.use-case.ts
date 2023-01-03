import { Injectable } from '@nestjs/common';
import { IBcrypt } from 'src/domain/abstracts/adapter/bcrypt.abstract';
import { IDataServices } from 'src/domain/abstracts/data-services.abstract';
import { IException } from 'src/domain/abstracts/exception-services.abstract';
import { LoginUserDto, RegisterUserDto } from 'src/domain/dtos/user.dto';
import { User } from 'src/domain/models/user.model';

@Injectable()
export class AuthUseCases {
  constructor(
    private dataServices: IDataServices,
    private exception: IException,
    private bcrypt: IBcrypt,
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

  async login(loginData: LoginUserDto): Promise<any> {
    // const { cookieWithJwtToken, refreshToken, cookieWithRefreshToken } =
    //   await this.authService.login(loginData);
    // await this.dataServices.users.saveRefreshToken(
    //   refreshToken,
    //   loginData.email,
    // );
    // response.setHeader('Set-Cookie', [
    //   cookieWithJwtToken,
    //   cookieWithRefreshToken,
    // ]);
  }
}
