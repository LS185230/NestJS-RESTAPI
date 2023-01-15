import {
  Controller,
  Get,
  Req,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { JwtGuard } from 'src/authentication/guard';
import { GetUser } from '../authentication/decorators';

@UseGuards(JwtGuard) // jwt is the strategy here
@Controller('users')
export class UserController {
  @Get('me')
  getMe(@GetUser() user: User) {
    //using custom decorator here
    return user;
  }
}
