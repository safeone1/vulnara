'use client';

import { useState } from 'react';
import { signIn } from '@/lib/auth-client';

const GitHubMark = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.13-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.35.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.44-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.41-2.7 5.39-5.26 5.67.41.36.78 1.07.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

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
