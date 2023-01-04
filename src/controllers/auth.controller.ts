import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UseGuards,
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
import { JwtAuthGuard } from 'src/infrastructure/guards/jwt-auth.guard';
import { UserDecorator } from 'src/infrastructure/decorators/user.decorator';
// import { User } from 'src/domain/models/user.model';
import JwtRefreshGuard from 'src/infrastructure/guards/jwt-refresh.guard';

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

  @Post('logout')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async logout(
    @UserDecorator() user: any,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log(user);

    const cookies = await this.authUseCases.logout(user.email);

    response.setHeader('Set-Cookie', cookies);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refresh(
    @UserDecorator() user: any,
    @Res({ passthrough: true }) response: Response,
  ) {
    const cookieWithJwtToken =
      await this.authUseCases.generateCookieWithJwtToken({ email: user.email });

    response.setHeader('Set-Cookie', cookieWithJwtToken);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@UserDecorator() user: any) {
    return user;
  }
}
