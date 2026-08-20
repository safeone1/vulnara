import { Module } from '@nestjs/common';
import { UserRouter } from './users.router';

@Module({
  providers: [UserRouter],
})
export class UsersModule {}
