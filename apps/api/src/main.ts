import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SmeeClient } from 'smee-client';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  const rawBodySaver = (req: any, res: any, buf: Buffer) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    req.rawBody = buf;
  };

  // trpc mount — check your @Router/module config for the actual path,
  // default in nestjs-trpc is usually '/trpc'
  app.use('/trpc', json());

  // webhook route — needs raw bytes for signature verification
  app.use('/webhooks/github', json({ verify: rawBodySaver }));

  await app.listen(process.env.PORT ?? 3022);

  if (process.env.NODE_ENV === 'development') {
    const smee = new SmeeClient({
      source: 'https://smee.io/TjOI0tXgiKrFoIY',
      target: `http://localhost:${process.env.PORT ?? 3022}/webhooks/github`,
    });
    smee.start();
  }
}
bootstrap();
