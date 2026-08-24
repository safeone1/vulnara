// github.service.ts
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class GithubService {
  private readonly logger = new Logger(GithubService.name);

  handleEvent(event: string, payload: any) {
    this.logger.log(`event=${event}`);
    console.log(payload);
    return { received: true };
  }
}
