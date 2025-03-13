import React, { useContext } from "react";
// import Link from "../../Routing/Link/Link";
import Link from "../../../Components/Routing/Link/Link.tsx";
import "./navbar.css";
import { ThemeContext } from "../../../App.tsx";

function Navbar() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <nav id="navbar" className={theme}>
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
        <div className="navbar-toggle-container">
          <div
            className="toggle"
            onClick={() =>
              setTheme &&
              setTheme(prev => (prev === "light" ? "dark" : "light"))
            }
          >
            <div className="toggle-handle">
              <i
                className={`fa-solid ${
                  theme === "dark" ? "fa-moon" : "fa-sun"
                }`}
              ></i>
            </div>
          </div>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
