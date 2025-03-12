import React from "react";
import Link from "../../Components/Routing/Link/Link.tsx";
import "./Home.css";

function Home() {
  return (
    <section>
      <h1 className="home-header">Home</h1>
      <ul className="home-nav">
        <li>
          <Link to="/lists">
            <span>Make a to do list</span>
            <span>{`\>`}</span>
          </Link>
        </li>
        <li>
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
