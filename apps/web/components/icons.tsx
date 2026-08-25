import { cn } from "@/lib/utils";

type IconProps = React.ComponentProps<"svg">;

/**
 * Vulnara's own mark: a shield with a scan pulse running through it.
 */
export function VulnaraMark({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("size-6", className)}
      {...props}
    >
      <path
        d="M12 2.2 4 5.4v6.2c0 4.9 3.3 9 8 10.2 4.7-1.2 8-5.3 8-10.2V5.4l-8-3.2Z"
        className="fill-primary/15 stroke-primary"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M7.3 12.6h2.2l1.4-3.5 2 6 1.3-2.5h2.5"
        className="stroke-primary"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function VulnaraWordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <VulnaraMark className="size-6" />
      <span className="text-[0.95rem] font-semibold tracking-tight">
        Vulnara
      </span>
    </span>
  );
}

export function GitHubMark({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("size-5 fill-current", className)}
      {...props}
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.13-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.35.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.44-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.41-2.7 5.39-5.26 5.67.41.36.78 1.07.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

/*
 * The marks below are simplified, recognisable stand-ins drawn to a common
 * 24×24 grid — they are not the official trademarked artwork. Swap in the
 * vendors' real SVGs before this page goes public.
 */

export function GitLabMark({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("size-5 fill-current", className)}
      {...props}
    >
      <path d="M12 22.5 8.7 9.8h6.6L12 22.5Z" opacity=".95" />
      <path d="M12 22.5 1.5 9.8h7.2L12 22.5Z" opacity=".7" />
      <path d="M12 22.5 22.5 9.8h-7.2L12 22.5Z" opacity=".7" />
      <path d="M1.5 9.8 3.4 1.6a.5.5 0 0 1 .95-.03L6.4 9.8H1.5Z" opacity=".85" />
      <path
        d="M22.5 9.8 20.6 1.6a.5.5 0 0 0-.95-.03L17.6 9.8h4.9Z"
        opacity=".85"
      />
    </svg>
  );
}

export function VercelMark({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("size-5 fill-current", className)}
      {...props}
    >
      <path d="M12 2.5 22.5 21H1.5L12 2.5Z" />
    </svg>
  );
}

export function SlackMark({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("size-5 fill-current", className)}
      {...props}
    >
      <rect x="2.5" y="13.4" width="8.1" height="3" rx="1.5" opacity=".9" />
      <rect x="7.5" y="2.5" width="3" height="8.1" rx="1.5" opacity=".7" />
      <rect x="13.4" y="7.5" width="8.1" height="3" rx="1.5" opacity=".9" />
      <rect x="13.4" y="13.4" width="3" height="8.1" rx="1.5" opacity=".7" />
    </svg>
  );
}

export function DockerMark({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("size-5 fill-current", className)}
      {...props}
    >
      <g opacity=".9">
        <rect x="3.2" y="11.6" width="3.1" height="2.7" rx=".4" />
        <rect x="6.9" y="11.6" width="3.1" height="2.7" rx=".4" />
        <rect x="10.6" y="11.6" width="3.1" height="2.7" rx=".4" />
        <rect x="14.3" y="11.6" width="3.1" height="2.7" rx=".4" />
        <rect x="6.9" y="8.4" width="3.1" height="2.7" rx=".4" />
        <rect x="10.6" y="8.4" width="3.1" height="2.7" rx=".4" />
        <rect x="10.6" y="5.2" width="3.1" height="2.7" rx=".4" />
      </g>
      <path d="M1.6 15.1h20.8a5.7 5.7 0 0 1-1.9 3.2c-1.4 1.2-3.4 1.8-6 1.8-4.6 0-8.6-1.5-10.9-4.2a5 5 0 0 1-2-.8Z" />
    </svg>
  );
}

export function KubernetesMark({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("size-5 stroke-current", className)}
      strokeWidth="1.4"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 1.8 20.5 6v9.4L12 22.2 3.5 15.4V6L12 1.8Z" />
      <circle cx="12" cy="12" r="2.6" />
      <path
        d="M12 3.6v5.8M20 7.4l-5.5 3M20 15l-5.4-1.4M14.6 20.6 13 15.1M9.4 20.6 11 15.1M4 15l5.4-1.4M4 7.4l5.5 3"
        strokeLinecap="round"
        opacity=".75"
      />
    </svg>
  );
}

export function TerraformMark({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("size-5 fill-current", className)}
      {...props}
    >
      <path d="M8.4 8.6 2.1 5v7.2l6.3 3.6V8.6Z" opacity=".75" />
      <path d="M9.1 8.9v7.2l6.3 3.6v-7.2L9.1 8.9Z" opacity=".95" />
      <path d="M15.9 8.6 22.2 5v7.2l-6.3 3.6V8.6Z" opacity=".75" />
      <path d="M9.1.7v7.2l6.3 3.6V4.3L9.1.7Z" opacity=".95" />
    </svg>
  );
}
