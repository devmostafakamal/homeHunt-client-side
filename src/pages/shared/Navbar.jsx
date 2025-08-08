import React from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";

// Fake auth hook — replace with your own

const Navbar = () => {
  const { user, logOut } = useAuth(); // user: { displayName, photoURL, email }

  const handleLogout = async () => {
    try {
      await logOut();
      console.log("Logged out");
    } catch (err) {
      console.error(err);
    }
  };

  const navItems = (
    <>
      <li>
        <NavLink to="/" className="font-semibold">
          Home
        </NavLink>
      </li>

      <>
        <li>
          <NavLink to="/allProperties">All Properties</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      </>
    </>
  );

  return (
    <div className="navbar sticky top-0 z-50 bg-blue-300 shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
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
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50"
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

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-2">
            <img
              src={user.photoURL}
              alt="User"
              className="w-8 h-8 rounded-full border"
              title={user.displayName}
            />
            <button onClick={handleLogout} className="btn btn-outline btn-sm">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="btn btn-primary btn-sm">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
