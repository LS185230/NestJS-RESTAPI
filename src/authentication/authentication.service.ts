import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AuthenticationDTO } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable({})
export class AuthenticationService {
  // Dependency Injection of DatabaseService
  constructor(private prisma: DatabaseService) {}

  async signin(dto: AuthenticationDTO) {
    console.log(
      '======= SignIn Function Invoked ===========',
    );

    try {
      const user =
        await this.prisma.user.findUnique({
          where: {
            email: dto.email,
          },
        });

      // If no User exists with that email Id
      if (!user) {
        throw new ForbiddenException(
          'Credentials Incorrect',
        );
      }

      // Compare Passwords
      const pwCorrect: boolean =
        await argon.verify(
          user.hash,
          dto.password,
        );

      // Password Does not Matches
      if (!pwCorrect) {
        throw new ForbiddenException(
          'Wrong Password',
        );
      } else {
        delete user.hash;
        return user;
      }
    } catch (error) {
      throw error;
    }
  }

  async signup(dto: AuthenticationDTO) {
    console.log(
      '===== SignUp Function Invoked =====',
    );

    try {
      /* Generate hash password */
      const hashPw = await argon.hash(
        dto.password,
      );

      /* Save the New User in DB */
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hashPw,
        },
      });
      delete user.hash;

      /* Return the New User */
      return user;
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credentials Taken.',
          );
        }
      } else {
        throw error;
      }
    }
  }
}
