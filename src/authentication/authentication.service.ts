import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AuthenticationDTO } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt/dist';
import { use } from 'passport';
import { config } from 'process';
import { ConfigService } from '@nestjs/config/dist';

@Injectable({})
export class AuthenticationService {
  // Dependency Injection of DatabaseService and JwtService
  constructor(
    private prisma: DatabaseService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

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
      }

      return this.signToken(user.id, user.email);
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

      return this.signToken(user.id, user.email);
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

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = { sub: userId, email: email };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(
      payload,
      { expiresIn: '15m', secret: secret },
    );

    return {
      access_token: token,
    };
  }
}
