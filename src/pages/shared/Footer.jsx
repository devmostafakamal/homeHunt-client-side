import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaPinterestP,
  FaYelp,
} from "react-icons/fa";
import { SiGoogle } from "react-icons/si";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-[#004880] text-white">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Discover */}
        <div className="flex items-start gap-2 flex-col">
          <Link to="/">Home</Link>
          <Link to="/allProperties"> All Properties</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/rentProperties">Rent Properties</Link>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="mb-6 font-semibold text-lg">Contact Us</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center space-x-2">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 12.414M12 12l-1.414-1.414M7.5 7.5l-2.121 2.121m6.364-6.364L12 3m4.242 4.242L21 12"
                ></path>
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              <span>774 NE 84th St Miami, FL 33879</span>
            </li>
            <li className="flex items-center space-x-2">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M3 8v8a2 2 0 002 2h14a2 2 0 002-2V8M3 8l9 6 9-6"
                ></path>
              </svg>
              <span>879 456 1349</span>
            </li>
            <li className="flex items-center space-x-2">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 12a4 4 0 01-8 0 4 4 0 018 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 14v7"
                />
              </svg>
              <span>email@houzez.co</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="mb-6 font-semibold text-lg">Newsletter</h3>
          <form className="flex flex-wrap gap-2 items-center  mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow rounded-md px-4 py-2 bg-white text-black focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-[#009EFF] px-4 py-2 rounded-md font-semibold hover:bg-[#007acc] transition"
            >
              Submit
            </button>
          </form>
          <p className="text-xs">
            Houzez is a premium WordPress theme for Designers & Real Estate
            Agents.
          </p>
        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t border-blue-700 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          {/* Social Icons */}
          <div className="flex space-x-6 text-sm text-white">
            <a
              href="https://facebook.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="cursor-pointer hover:text-gray-300" />
            </a>
            <a
              href="https://twitter.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="cursor-pointer hover:text-gray-300" />
            </a>
            <a
              href="https://instagram.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="cursor-pointer hover:text-gray-300" />
            </a>
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn className="cursor-pointer hover:text-gray-300" />
            </a>
            <a
              href="mailto:yourmail@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiGoogle className="cursor-pointer hover:text-gray-300" />
            </a>
          </div>

          {/* Logo */}
          <div className="text-white font-bold flex items-center space-x-2 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11c0-2.5-3-2.5-3-5a3 3 0 016 0c0 2.5-3 2.5-3 5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21v-7"
              />
            </svg>
            <span className="text-2xl">houzez</span>
          </div>

          {/* Copyright */}
          <div className="text-xs text-white/70">
            © Houzez - All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
