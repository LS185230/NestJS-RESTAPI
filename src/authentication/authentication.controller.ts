import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationDTO } from './dto';

@Controller('auth')
export class AuthenticationController {
  // Doing Dependency Injection fir Auth Service (private -> Short Hand Notation)
  constructor(private authService: AuthenticationService) {}

  @Post('signup') // => PostReq = /auth/signup
  signUp(@Body() dto: AuthenticationDTO) {
    console.log({ dto });
    return this.authService.signup(dto);
  }

  @Post('signin') // => PostReq = /auth/signin
  signIn() {
    return this.authService.signin();
  }
}
