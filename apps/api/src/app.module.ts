import { Module } from '@nestjs/common';
import { TRPCModule } from 'nestjs-trpc';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './lib/auth';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule.forRoot({ auth }),
    TRPCModule.forRoot({}),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
