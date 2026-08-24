import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GithubService } from './github.service';
import { GithubWebhooksController } from './github.controller';
import { GithubSignatureMiddleware } from './github.middleware';

@Module({
  providers: [GithubService],
  controllers: [GithubWebhooksController],
})
export class WebhooksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GithubSignatureMiddleware)
      .forRoutes(GithubWebhooksController);
  }
}
