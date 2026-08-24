import { GithubMiddleware } from './github.middleware';

describe('GithubMiddleware', () => {
  it('should be defined', () => {
    expect(new GithubMiddleware()).toBeDefined();
  });
});
