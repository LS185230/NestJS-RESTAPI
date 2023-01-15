import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient {
  // Prisma Client Class helps to Connect with Database
  constructor(private config: ConfigService) {
    // Dependency Injection of Global Config Module
    super({
      // This will call constructor of PrismaClient class to Configure things
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }
}
