import Link from "next/link";

function HomePage() {
  return (
    <div>
      <h1>the home page</h1>
      <ul>
        <li>
          <Link replace href="/portfolio">Portfolio</Link>
        </li>
        <li>
          <Link href="/clients">Clients</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>
    </div>
  );
}

export default HomePage;
