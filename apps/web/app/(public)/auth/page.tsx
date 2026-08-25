'use client';

import { useState } from 'react';
import { signIn } from '@/lib/auth-client';
import { GitHubMark } from '@/components/icons';

export default function AuthPage() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGitHubSignIn = async () => {
    setError(null);
    setIsConnecting(true);
    const { error: signInError } = await signIn.social({
      provider: 'github',
      callbackURL: `${window.location.origin}/`,
    });
    if (signInError) {
      setError(signInError.message ?? 'Could not connect to GitHub. Please try again.');
      setIsConnecting(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-1 items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-8 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground/10 bg-background">
            <GitHubMark />
          </div>

          <h1 className="mt-5 text-xl font-semibold tracking-tight">
            Connect your GitHub account
          </h1>
          <p className="mt-2 text-sm text-foreground/60">
            Sign in with GitHub to link your repositories and continue.
          </p>
        </div>

        <button
          type="button"
          onClick={handleGitHubSignIn}
          disabled={isConnecting}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <GitHubMark />
          {isConnecting ? 'Connecting…' : 'Continue with GitHub'}
        </button>

        {error && (
          <p className="mt-4 text-center text-sm text-red-500" role="alert">
            {error}
          </p>
        )}

        <p className="mt-6 text-center text-xs text-foreground/40">
          By continuing you agree to grant read access to your repositories.
        </p>
      </div>
    </main>
  );
}
