"use client";

import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
      <p className="text-2xl">Oops! Something went wrong!</p>
      <button className="btn btn-primary">
        <Link href="/" replace>
          Go Back Home
        </Link>
      </button>
    </div>
  );
}
