"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn&apos;t load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => reset()}
            className="btn btn-sm btn-primary normal-case tracking-normal text-sm font-medium px-4 py-2"
          >
            Try again
          </button>
          <Link
            href="/"
            className="btn btn-sm btn-outline normal-case tracking-normal text-sm font-medium px-4 py-2"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
