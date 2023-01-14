import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

/* 
  @Global Decorator : ensures if we want any module in many modules(more than 1) we dont need to add it's import everywhere for using DI. 
  make sure we add it's export and we include this module in app module.
*/

@Global()
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService], // If we are using this service as a DI in some other service then we need to export it
})
export class DatabaseModule {}
