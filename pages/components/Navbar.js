import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <div>
        <h1>
          Navbar
        </h1>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/diary">Diary</Link>
      </div>
    </nav>
  );
}
 
export default Navbar;