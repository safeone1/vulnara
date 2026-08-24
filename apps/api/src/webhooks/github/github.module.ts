import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GithubWebhooksController } from './github.controller';
import { GithubSignatureMiddleware } from './github.middleware';
import { GithubRouter } from './routes/github.router';

@Module({
  controllers: [GithubWebhooksController],
  providers: [GithubRouter],
})
export class GithubModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GithubSignatureMiddleware)
      .forRoutes(GithubWebhooksController);
  }
}
