import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logOut();
      console.log("Logged out");
    } catch (err) {
      console.error(err);
    }
  };

  // বাইরে ক্লিক করলে বন্ধ হবে
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          className="font-semibold [font-size:var(--nav-font-size)]"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allProperties"
          className="[font-size:var(--nav-font-size)] "
        >
          All Properties
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard" className="[font-size:var(--nav-font-size)]">
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/rentProperties"
          className="[font-size:var(--nav-font-size)] "
        >
          Rent Properties
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar sticky top-0 z-50 [background-color:var(--primary-color)] shadow-md px-8">
      <div className="navbar-start">
        {/* Mobile dropdown */}
        <div className="dropdown group">
          <button tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>

          <ul
            tabIndex={0}
            className="menu menu-compact menu-vertical dropdown-content mt-12 left-0 shadow bg-base-100 rounded-box w-52 z-50 
                   transition-all duration-300 ease-in-out origin-top
                   scale-95 opacity-0 invisible
                   group-focus-within:scale-100 group-focus-within:opacity-100 group-focus-within:visible"
          >
            {navItems}
          </ul>
        </div>

        {/* Logo + Name */}
        <Link to="/" className="btn btn-ghost text-xl font-bold">
          <img
            src="/assets/Editable-Real-Estate-Logo-Design.png"
            alt="Logo"
            className="h-8 w-8 mr-2"
          />
          RealNest
        </Link>
      </div>

      {/* Center Nav */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>

      {/* Right Side */}
      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-2">
            <img
              src={user.photoURL}
              alt="User"
              className="w-8 h-8 rounded-full border"
              title={user.displayName}
            />
            <button
              onClick={handleLogout}
              className="btn btn-outline btn-sm [font-size:var(--nav-font-size)]"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="btn btn-primary btn-sm [font-size:var(--nav-font-size)]">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
