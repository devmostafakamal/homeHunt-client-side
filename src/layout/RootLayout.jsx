import React from "react";
import Navbar from "../pages/shared/Navbar";
import { Outlet, useLocation } from "react-router";
import Footer from "../pages/shared/Footer";
import Banner from "../pages/Home/Banner";

function RootLayout() {
  const location = useLocation();

  const isHome = location.pathname === "/";
  return (
    <div>
      {/* Navbar সবসময় উপরে */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Banner শুধু homepage এ render হবে */}
      <div>
        {isHome && <Banner />}
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default RootLayout;
