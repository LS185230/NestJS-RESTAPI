import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    UserModule,
    BookmarkModule,
    AuthenticationModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
