import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CourseModule } from './course/course.module';
import { InvitationModule } from './invitation/invitation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    UsersModule,
    AuthModule,
    CourseModule,
    InvitationModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
