import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
      <h1 className="text-4xl">404</h1>
      <p>We couldn&apos;t found the resource you&apos;re looking for!</p>
      <button className="btn btn-primary">
        <Link href="/" replace>
          Go Back Home
        </Link>
      </button>
    </div>
  );
}
