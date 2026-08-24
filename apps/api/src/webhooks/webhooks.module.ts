import { Module } from '@nestjs/common';
import { GithubModule } from './github/github.module';

@Module({
  // providers: [GithubModule],
  // controllers: [GithubWebhooksController],
  imports: [GithubModule],
})
export class WebhooksModule {}
