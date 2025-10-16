import React from "react";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaFacebook,
  FaGoogle,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";
import logo from "../../assets/Logo/website-logo.jpeg";

const Footer = () => {
  return (
    <footer className="bg-richblack-800 text-richblack-300 pt-10 sm:pt-12 mt-16 sm:mt-20 w-full pb-4">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 md:gap-12">
          {/* Logo and Brand */}
          <div className="flex flex-col gap-4 md:pr-12">
            <div className="flex items-center gap-3">
              <Link to="/">
                <img
                  src={logo}
                  alt="ScholarSpace Logo"
                  className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full object-cover"
                  loading="lazy"
                />
              </Link>
              <p className="text-richblack-5 text-xl sm:text-2xl font-semibold">
                ScholarSpace
              </p>
            </div>
          </div>

          {/* Company Links */}
          <div className="flex flex-col gap-3">
            <h2 className="text-richblack-100 font-bold text-base sm:text-lg">
              Company
            </h2>
            <Link
              to="/about"
              className="hover:text-richblack-50 text-sm sm:text-base"
            >
              About
            </Link>
            <Link
              to="/careers"
              className="hover:text-richblack-50 text-sm sm:text-base"
            >
              Careers
            </Link>
            <Link
              to="/affiliates"
              className="hover:text-richblack-50 text-sm sm:text-base"
            >
              Affiliates
            </Link>
            <div className="flex items-center gap-3 sm:gap-4 mt-3 sm:mt-4">
              <button
                aria-label="Facebook"
                className="p-2 rounded hover:text-white"
              >
                <FaFacebook className="cursor-pointer" />
              </button>
              <button
                aria-label="Google"
                className="p-2 rounded hover:text-white"
              >
                <FaGoogle className="cursor-pointer" />
              </button>
              <button
                aria-label="Twitter"
                className="p-2 rounded hover:text-white"
              >
                <FaTwitter className="cursor-pointer" />
              </button>
              <button
                aria-label="YouTube"
                className="p-2 rounded hover:text-white"
              >
                <FaYoutube className="cursor-pointer" />
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-richblack-700 mt-8 sm:mt-10 pt-4 sm:pt-6 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm">
          <div className="flex gap-2 sm:gap-3 flex-wrap justify-center">
            <p className="hover:text-richblack-50 cursor-pointer">
              Privacy Policy
            </p>
            <span className="hidden sm:inline">|</span>
            <p className="hover:text-richblack-50 cursor-pointer">Cookies</p>
            <span className="hidden sm:inline">|</span>
            <p className="hover:text-richblack-50 cursor-pointer">Terms</p>
          </div>

          <div className="flex items-center gap-2 text-richblack-200 text-xs sm:text-sm">
            Made with <FaHeart className="text-pink-300" /> by ScholarSpace
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
