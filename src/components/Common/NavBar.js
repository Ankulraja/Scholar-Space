import React, { useState, useEffect } from "react";
import logo from "../../assets/Logo/website-logo.jpeg";
import { Link, matchPath, useLocation } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import ApiConnector from "../../services/ApiConnector";
import { categories } from "../../services/Api";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import ProfileDropDown from "../Core/ProfileDropDown";

const NavBar = () => {
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);

  const [subLinks, setSubLinks] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  async function fetchSubLinks() {
    try {
      const result = await ApiConnector("GET", categories.CATEGORIES_API);
      // console.log("........Sublink",result.data.allCategorys)
      setSubLinks(result.data.allCategorys);
    } catch (error) {
      console.log("Could not fetch sublinks...", error);
    }
  }

  useEffect(() => {
    fetchSubLinks();
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full h-16 flex items-center justify-center border-b-[1px] border-richblack-700 text-white bg-richblack-900/95 backdrop-blur">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to={"/"}>
            <img
              src={logo}
              className="rounded-full aspect-square w-10"
              loading="lazy"
              alt="logo"
            />
          </Link>
          <p className="text-richblack-5 text-xl font-semibold">ScholarSpace</p>
        </div>

        <div className="hidden md:block">
          <ul className="flex gap-5">
            {NavbarLinks.map((link, index) => {
              return (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div className="flex items-center gap-1 relative group">
                      <p>{link?.title}</p>
                      <IoIosArrowDown />

                      <div
                        className="lg:w-[250px] absolute bg-richblack-5  opacity-0 invisible group-hover:opacity-100 
                                    group-hover:visible top-9 -right-[51px] rounded-md transition-all duration-200 z-50"
                      >
                        <div className="w-6 h-6 rotate-45 absolute -z-50 bg-richblack-5 -top-2 right-12  rounded-sm"></div>

                        <div className="text-richblack-800 flex flex-col py-2  ">
                          {subLinks?.length ? (
                            subLinks.map((subLink, index) => {
                              return (
                                <div className="hover:bg-richblack-200 px-4 py-1">
                                  <Link
                                    key={index}
                                    to={`/catalog/${subLink?.title
                                      ?.split(" ")
                                      .join("-")
                                      .toLowerCase()}`}
                                  >
                                    {subLink?.title}
                                  </Link>
                                </div>
                              );
                            })
                          ) : (
                            <div></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link to={link?.path}>
                      <p
                        className={`${
                          matchRoute(link?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="hidden md:flex gap-2 items-center justify-center w-40 h-10">
          {user && user.accountType === "Student" && (
            <Link to={"/dashboard/cart"} className="relative">
              <AiOutlineShoppingCart className="w-10 h-6" />
              {totalItems > 0 && (
                <span
                  className="text-white absolute -top-1 transition-all duration-200 animate-bounce text-sm left-6 w-4 h-4 flex justify-center items-center 
                            rounded-full bg-caribbeangreen-400"
                >
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null && (
            <Link to={"/login"}>
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                Login
              </button>
            </Link>
          )}

          {token === null && (
            <Link to={"/signup"}>
              <button className="border border-richblack-700 bg-richblack-800 px-[6px] py-[8px] text-richblack-100 rounded-md">
                Sign Up
              </button>
            </Link>
          )}

          {token !== null && <ProfileDropDown />}
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button
            aria-label="Toggle menu"
            className="p-2 rounded-md border border-richblack-700 bg-richblack-800"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? (
              <HiX className="w-5 h-5" />
            ) : (
              <HiOutlineMenu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Backdrop */}
      <div
        className={`md:hidden fixed inset-0 bg-black/50 transition-opacity duration-300 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      ></div>

      {/* Mobile Sidebar Drawer */}
      <aside
        className={`md:hidden fixed top-0 
          right-0 h-screen w-72 sm:w-80 bg-richblack-900
           border-l border-richblack-700 text-white z-50
           transform transition-transform duration-300 ease-out ${
             mobileOpen ? "translate-x-0" : "translate-x-full"
           }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between px-4 h-16 border-b border-richblack-700">
            <div className="flex items-center gap-2">
              <img
                src={logo}
                className="rounded-full aspect-square w-8"
                alt="logo"
              />
              <span className="font-semibold">ScholarSpace</span>
            </div>
            <button
              className="p-2 rounded-md border border-richblack-700 bg-richblack-800"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <HiX className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            {/* Links */}
            <div className="flex flex-col gap-1">
              {NavbarLinks.map((link, index) => (
                <div key={index}>
                  {link.title === "Catalog" ? (
                    <div>
                      <button
                        className="w-full flex items-center justify-between py-2"
                        onClick={() => setCatalogOpen((o) => !o)}
                        aria-expanded={catalogOpen}
                      >
                        <span>Catalog</span>
                        <IoIosArrowDown
                          className={`${
                            catalogOpen ? "rotate-180" : "rotate-0"
                          } transition-transform duration-300`}
                        />
                      </button>
                      <div
                        className={`pl-3 pb-1 flex flex-col gap-1 overflow-hidden transition-all duration-300 ease-out ${
                          catalogOpen
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        {subLinks?.length ? (
                          subLinks.map((subLink, idx) => (
                            <Link
                              key={idx}
                              to={`/catalog/${subLink?.title
                                ?.split(" ")
                                .join("-")
                                .toLowerCase()}`}
                              onClick={() => setMobileOpen(false)}
                              className="py-1 text-richblack-200 hover:text-richblack-5"
                            >
                              {subLink?.title}
                            </Link>
                          ))
                        ) : (
                          <div className="text-richblack-300 text-sm py-1">
                            Loading...
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={link?.path}
                      className={`block py-2 ${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.title}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Cart and Auth Footer */}
          <div className="px-4 pb-4 pt-2 border-top border-richblack-700 w-full">
            <div className="flex flex-col gap-3 w-full">
              {user && user.accountType === "Student" ? (
                <Link
                  to={"/dashboard/cart"}
                  className="relative w-full"
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="w-full flex items-center gap-3 border border-richblack-700 bg-richblack-800 px-3 py-2 rounded-md">
                    <AiOutlineShoppingCart className="w-6 h-6" />
                    <span>Cart</span>
                    {totalItems > 0 && (
                      <span className="ml-auto text-white w-5 h-5 flex justify-center items-center rounded-full bg-caribbeangreen-400 text-xs">
                        {totalItems}
                      </span>
                    )}
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {token === null ? (
                <div className="flex flex-col gap-2 w-full">
                  <Link
                    to={"/login"}
                    onClick={() => setMobileOpen(false)}
                    className="w-full"
                  >
                    <button className="w-full border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100 rounded-md text-sm">
                      Login
                    </button>
                  </Link>
                  <Link
                    to={"/signup"}
                    onClick={() => setMobileOpen(false)}
                    className="w-full"
                  >
                    <button className="w-full border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100 rounded-md text-sm">
                      Sign Up
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="w-full">
                  <ProfileDropDown />
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default NavBar;
