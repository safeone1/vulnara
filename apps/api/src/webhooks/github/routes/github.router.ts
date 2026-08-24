import { Query, Router } from 'nestjs-trpc';

@Router({ alias: 'github' })
export class GithubRouter {
  @Query()
  getGithubData() {
    return { message: 'Hello from GithubRouter!' };
  }
}
