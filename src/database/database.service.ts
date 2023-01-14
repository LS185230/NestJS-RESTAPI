import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient {
  // Prisma Client Class helps to Connect with Database
  constructor() {
    super({
      // This will call constructor of PrismaClient class to Configure things
      datasources: {
        db: {
          url: 'postgresql://lakshaydev:lakshay14@localhost:5434/nest-restapi-dev-db?schema=public',
        },
      },
    });
  }
}
