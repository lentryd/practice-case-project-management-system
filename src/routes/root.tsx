import { Link, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
      </>
  );
}