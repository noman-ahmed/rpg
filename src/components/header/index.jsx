import React, { useState } from "react";
import { NavLink as Link } from "react-router-dom";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { path: "/", label: "Home" },
    { path: "/login", label: "Login" },
    { path: "/register", label: "Register" },
    { path: "/chatroom", label: "Chat Room" },
    { path: "/dashboard", label: "Dashboard" },
  ];

  return (
    <nav className="nav">
      <div className="nav-wrapper">
        <FontAwesomeIcon
          icon={faBars}
          className="hamburger"
          onClick={toggleMenu}
        />
        <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
          {links.map((link) => (
            <li
              className="nav-li"
              key={link.path}
              onClick={() => setIsOpen(false)}
            >
              <Link to={link.path} className="nav-link">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
