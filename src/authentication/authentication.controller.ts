import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationDTO } from './dto';

@Controller('auth')
export class AuthenticationController {
  // Doing Dependency Injection fir Auth Service (private -> Short Hand Notation)
  constructor(
    private authService: AuthenticationService,
  ) {}

  @Post('signup') // => PostReq = /auth/signup
  signUp(@Body() dto: AuthenticationDTO) {
    console.log({ dto });
    return this.authService.signup(dto);
  }
  @HttpCode(HttpStatus.OK)
  @Post('signin') // => PostReq = /auth/signin
  signIn(@Body() dto: AuthenticationDTO) {
    return this.authService.signin(dto);
  }
}
