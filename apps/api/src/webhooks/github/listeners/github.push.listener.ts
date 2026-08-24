import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter/dist/decorators/on-event.decorator';
import type { PushEvent } from '@octokit/webhooks-types';

@Injectable()
export class GithubPushListener {
  @OnEvent('github.push')
  handlePushEvent(payload: PushEvent) {
    console.log(
      '[github.push] event received:',
      payload.pusher.username,
      payload.repository.full_name,
    );
  }
}
