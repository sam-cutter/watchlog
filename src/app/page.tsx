import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>Watchlog</h1>
      <Link href="/login">Log in</Link>
    </div>
  );
}
