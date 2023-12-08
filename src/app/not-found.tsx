import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col gap-6 justify-center items-center">
      <div>
        <h2 className="text-6xl font-bold">Not Found</h2>
        <p className="text-xl">Could not find requested resource</p>
      </div>
      <Link className="bg-primary rounded-xl px-6 py-2 text-secondary" href="/">
        Return Home
      </Link>
    </div>
  );
}
