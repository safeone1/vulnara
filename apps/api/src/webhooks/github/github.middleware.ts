import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { createHmac, timingSafeEqual } from 'crypto';

@Injectable()
export class GithubSignatureMiddleware implements NestMiddleware {
  use(req: Request & { rawBody: Buffer }, res: Response, next: NextFunction) {
    const signature = req.headers['x-hub-signature-256'] as string;
    const secret = process.env.GITHUB_WEBHOOK_SECRET!;

    const expected =
      'sha256=' +
      createHmac('sha256', secret).update(req.rawBody).digest('hex');

    const sigBuf = Buffer.from(signature ?? '');
    const expBuf = Buffer.from(expected);
    const valid =
      sigBuf.length === expBuf.length && timingSafeEqual(sigBuf, expBuf);

    if (!valid) throw new BadRequestException('Invalid signature');

    next();
  }
}
