import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

@Module({
  // This Module is Needed in all Modules so we will make it as Global so that we dont need to Import it everytime
  //imports:[DatabaseModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
