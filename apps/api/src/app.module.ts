import { Module } from '@nestjs/common';
import { TRPCModule } from 'nestjs-trpc';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './lib/auth';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { WebhooksModule } from './webhooks/webhooks.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule.forRoot({ auth }),
    TRPCModule.forRoot({}),
    UsersModule,
    WebhooksModule,
  ],
})
export class AppModule {}
