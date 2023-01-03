import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto, RegisterUserDto } from 'src/domain/dtos/user.dto';
import { AuthUseCases } from 'src/use-cases/auth/auth.use-case';
import { registerUserSchema } from './validation/register-user-schema';
import { JoiValidationPipe } from 'src/infrastructure/pipes/validation.pipe';
import { Response } from 'express';
import loginUserSchema from './validation/login-user-schema';
import { UserUseCases } from 'src/use-cases/user/user.use-case';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private authUseCases: AuthUseCases,
    private userUseCases: UserUseCases,
  ) {}

  @Post('signup')
  @UsePipes(new JoiValidationPipe(registerUserSchema))
  async register(@Body() registrationData: RegisterUserDto) {
    return this.authUseCases.register(registrationData);
  }

  @Post('login')
  @HttpCode(200)
  @UsePipes(new JoiValidationPipe(loginUserSchema))
  async login(
    @Body() loginData: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authUseCases.login(loginData);

    response.setHeader('Set-Cookie', [
      result.cookieWithJwtToken,
      result.cookieWithRefreshToken,
    ]);
  }
}
