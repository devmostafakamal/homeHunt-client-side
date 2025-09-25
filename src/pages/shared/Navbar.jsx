import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router"; // Corrected import for NavLink
import useAuth from "../../hooks/useAuth";
import { AiOutlineHome } from "react-icons/ai";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Handle logout
  const handleLogout = async () => {
    try {
      await logOut();
      console.log("Logged out");
    } catch (err) {
      console.error(err);
    }
  };

  // Handle click outside to close dropdown
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  // Detect scroll to trigger animation (only on large screens)
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 1024) {
        // lg breakpoint
        setIsScrolled(window.scrollY > 50);
      } else {
        setIsScrolled(false); // no scroll effect on small screens
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll); // update on resize

    handleScroll(); // run once on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          className="relative hover:bg-transparent font-semibold text-xl after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allProperties"
          className="relative hover:bg-transparent text-xl after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
        >
          All Properties
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          className="relative hover:bg-transparent text-xl after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
        >
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/rentProperties"
          className="relative hover:bg-transparent text-xl after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
        >
          Rent Properties
        </NavLink>
      </li>
    </>
  );

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transform transition-all duration-500 ease-out ${
        window.innerWidth < 1024
          ? "bg-white py-2 shadow-md text-black"
          : isHome
          ? isScrolled
            ? "bg-white py-2 shadow-lg text-black translate-y-0"
            : "bg-transparent py-4 text-white -translate-y-2"
          : "bg-white py-2 shadow-md text-black translate-y-0"
      }`}
    >
      <div className="navbar max-w-[1402px] mx-auto px-8 ">
        <div className="navbar-start">
          {/* Mobile dropdown */}
          <div className="dropdown group relative lg:hidden">
            {/* Hamburger button */}
            <button onClick={() => setOpen(!open)} className=" btn btn-ghost ">
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Sidebar */}
            <div
              className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 
              transform transition-transform duration-300 
              ${open ? "translate-x-0" : "-translate-x-full"}`}
            >
              {/* Header */}
              <div className="p-4 flex justify-between items-center border-b text-black">
                <h2 className="text-xl font-bold">Menu</h2>
                <button onClick={() => setOpen(false)} className="text-2xl">
                  ✕
                </button>
              </div>

              {/* Sidebar menu items */}
              <ul className="menu p-4 space-y-2 text-black">{navItems}</ul>
            </div>

            {/* Overlay */}
            {open && (
              <div
                className="fixed inset-0  bg-opacity-50 z-40"
                onClick={() => setOpen(false)}
              ></div>
            )}
          </div>

          {/* Logo + Name */}
          <Link to="/" className="lg:flex items-center gap-1 hidden ">
            <div className="bg-orange-500 p-2 rounded-xl">
              <AiOutlineHome className="h-6 w-6 text-white" />
            </div>
            <h2 className="font-bold text-2xl">homez</h2>
          </Link>
        </div>

        {/* Center Nav */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-4">{navItems}</ul>
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
                className="btn btn-outline btn-sm text-base"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login">
              <button className="px-6 py-2 rounded-md hover:bg-blue-500 text-xl border">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
