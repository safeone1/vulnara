import { Module } from '@nestjs/common';
import { TRPCModule } from 'nestjs-trpc';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './lib/auth';

@Module({
  imports: [AuthModule.forRoot({ auth }), TRPCModule.forRoot({})],
  controllers: [],
  providers: [],
})
export class AppModule {}
