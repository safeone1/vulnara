import { Controller, Post, Req, Headers } from '@nestjs/common';
import type { Request } from 'express';

@Controller('webhooks/github')
export class GithubWebhooksController {
  @Post()
  handle(@Req() req: Request, @Headers('x-github-event') event: string) {
    console.log(`[github webhook] event=${event}`, req.body);
    return { received: true };
  }
}
