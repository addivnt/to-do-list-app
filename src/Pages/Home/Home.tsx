import React, { useContext } from "react";
import { ThemeContext } from "../../App.tsx";
import Link from "../../Components/Routing/Link/Link.tsx";
import "./Home.css";

function Home() {
  const { theme } = useContext(ThemeContext);

  return (
    <section className={theme}>
      <h1 className="home-header">Home</h1>
      <ul className="home-nav">
        <li className="card">
          <Link to="/lists">
            <span>Make a to do list</span>
            <span>{`\>`}</span>
          </Link>
        </li>
        <li className="card">
          <Link to="/notes">
            <span>Make a note</span>
            <span>{`\>`}</span>
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default Home;
