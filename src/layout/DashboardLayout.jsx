import React from "react";
import { NavLink, Outlet } from "react-router";
// import ProFastLogo from "../pages/shared/ProFastLogo/ProFastLogo";
import {
  FaHome,
  FaUserShield,
  FaUserCircle,
  FaHeart,
  FaShoppingBag,
  FaStar,
  FaPlusSquare,
  FaListAlt,
  FaHandshake,
  FaEnvelopeOpenText,
  FaTools,
  FaUsersCog,
  FaComments,
  FaUserTie,
  FaBullhorn,
} from "react-icons/fa";
import useRole from "../hooks/useRole";

function DashboardLayout() {
  const { role, loading } = useRole();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        {/* Page content here */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none ">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
          <div className="hidden flex-none lg:hidden">
            {/* <ul className="menu menu-horizontal">
             
              <li>
                <a>Navbar Item 1</a>
              </li>
              <li>
                <a>Navbar Item 2</a>
              </li>
            </ul> */}
          </div>
        </div>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          {/* <ProFastLogo></ProFastLogo> */}
          <li>
            <NavLink to="/">
              <FaHome className="inline mr-2" /> Home
            </NavLink>
          </li>

          {/* user links */}
          {!loading && role === "user" && (
            <>
              <li>
                <NavLink to="/dashboard/myProfile">
                  <FaUserCircle className="inline mr-2" /> My Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/wishlist">
                  <FaHeart className="inline mr-2 text-red-500" /> Wishlist
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/property-bought">
                  <FaShoppingBag className="inline mr-2 text-green-600" />{" "}
                  Property Bought
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reviews">
                  <FaStar className="inline mr-2 text-yellow-500" /> My Reviews
                </NavLink>
              </li>
            </>
          )}

          {/* admin links */}
          {!loading && role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/adminProfile">
                  <FaUserShield className="inline mr-2 text-blue-700" /> Admin
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageProperties">
                  <FaTools className="inline mr-2 text-green-700" /> Manage
                  Properties
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageUser">
                  <FaUsersCog className="inline mr-2 text-purple-700" /> Manage
                  User
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-review">
                  <FaComments className="inline mr-2 text-yellow-600" /> Manage
                  Reviews
                </NavLink>
              </li>
              <NavLink to="/dashboard/advertise-property">
                <FaBullhorn className="inline mr-2 text-pink-600" /> Advertise
                Property
              </NavLink>
            </>
          )}

          {/* agent  links */}
          {!loading && role === "agent" && (
            <>
              <li>
                <NavLink to="/dashboard/agentProfile">
                  <FaUserTie className="inline mr-2" /> Agent Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addProperty">
                  <FaPlusSquare className="inline mr-2 text-green-600" /> Add
                  Property
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myAddProperties">
                  <FaListAlt className="inline mr-2 text-blue-500" /> My Added
                  Properties
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/mySoldProperties">
                  <FaHandshake className="inline mr-2 text-purple-600" /> My
                  Sold Properties
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/requestedProperties">
                  <FaEnvelopeOpenText className="inline mr-2 text-orange-500" />{" "}
                  Requested Properties
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default DashboardLayout;
