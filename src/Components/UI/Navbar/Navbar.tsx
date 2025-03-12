import React from "react";
// import Link from "../../Routing/Link/Link";
import Link from "../../../Components/Routing/Link/Link.tsx";
import "./navbar.css";

function Navbar() {
  return (
    <nav id="navbar">
      <div className="logo">
        <Link to="/">⌘</Link>
      </div>
      <ul>
        <div className="navbar-menu">
          <li>
            <Link to="/lists">Lists</Link>
          </li>
          <li>
            <Link to="/notes">Notes</Link>
          </li>
        </div>
        <div className="navbar-search">
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
