import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <div>
        <ul className="main-nav">
          <li>
            <NavLink to="/dogs">Dogs</NavLink>
          </li>
          <li>
            <NavLink to="/foods">Foods</NavLink>
          </li>
          <li>
            <NavLink to="/athletics">Athletics</NavLink>
          </li>
          {/*<li>
            <NavLink to="/search">Search</NavLink>
          </li>*/}
        </ul>
      </div>
    </div>
  );
};

export default Nav;
