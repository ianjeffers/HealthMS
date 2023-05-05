import React from "react";
import { Link } from "react-router-dom";
import { about_path, text_entry_path, home_path, data_view_path, profile_path } from "../constants";
import logo from "../images/logo.png";
import './Navbar.css';

const Navbar = () => {
    return (
        <div className="navbar">
        <img src={logo} alt="logo" />
        <ul>
          <li>
            <Link to={home_path}>Home</Link>
          </li>
          <li>
            <Link to={text_entry_path}>Enter Data</Link>
          </li>
          <li>
            <Link to={data_view_path}>View Data</Link>
          </li>
          <li>
            <Link to={about_path}>About</Link>
          </li>
          <li>
            <Link to={profile_path}>Profile</Link>
          </li>
        </ul>
      </div>
    )
}

export default Navbar;
