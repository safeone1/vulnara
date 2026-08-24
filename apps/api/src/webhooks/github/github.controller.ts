import { Controller, Post, Req, Headers } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import type { WebhookEvent } from '@octokit/webhooks-types';
import type { Request } from 'express';

@AllowAnonymous()
@Controller('webhooks/github')
export class GithubWebhooksController {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  @Post()
  handle(@Req() req: Request, @Headers('x-github-event') event: string) {
    const payload = req.body as WebhookEvent;
    this.eventEmitter.emit(`github.${event}`, payload);
    return { received: true };
  }
}
