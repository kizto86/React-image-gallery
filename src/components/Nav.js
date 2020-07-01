import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <div>
        <ul className="main-nav">
          <li>
            <NavLink to="/sunset">Sunset</NavLink>
          </li>
          <li>
            <NavLink to="/waterfall">Waterfall</NavLink>
          </li>
          <li>
            <NavLink to="/rainbow">Rainbow</NavLink>
          </li>
          <li>
            <NavLink to="/search">Search</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
