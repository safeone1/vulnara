import { GithubSignatureMiddleware } from './github.middleware';

describe('GithubSignatureMiddleware', () => {
  it('should be defined', () => {
    expect(new GithubSignatureMiddleware()).toBeDefined();
  });
});
