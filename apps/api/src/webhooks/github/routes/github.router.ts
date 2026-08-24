import { Query, Router } from 'nestjs-trpc';
import { z } from 'zod';

@Router({ alias: 'github' })
export class GithubRouter {
  @Query({ output: z.object({ message: z.string() }) })
  getGithubData() {
    return { message: 'Hello from GithubRouter!' };
  }
}
