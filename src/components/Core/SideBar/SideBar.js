import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import SideBarLinks from "./SideBarLinks";
import ConfirmationModal from "../../Common/ConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../services/AuthApi/AuthApi";
import { useNavigate } from "react-router-dom";
import { VscSignOut, VscMenu, VscClose } from "react-icons/vsc";

export default function SideBar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (profileLoading || authLoading) {
    return <div className="spinner"></div>;
  }

  const SidebarContent = () => (
    <>
      <div>
        {sidebarLinks.map((link) => {
          if (link.type && link.type !== user?.accountType) return null;
          return (
            <SideBarLinks
              key={link.id}
              name={link.name}
              iconName={link.icon}
              path={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
            />
          );
        })}
      </div>

      <div className="border-y-[1px] border-richblack-700 my-6 sm:my-8 mx-2 sm:mx-4"></div>

      <div>
        <SideBarLinks
          name={"Settings"}
          iconName={"VscSettingsGear"}
          path={"/dashboard/settings"}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <button
          onClick={() => setOpen((prevState) => !prevState)}
          className="w-full flex pl-4 sm:pl-7 items-center gap-2 py-2 hover:bg-richblack-700 transition-colors duration-200 rounded-r-lg"
        >
          <VscSignOut className="text-base text-richblack-200" />
          <span className="text-richblack-200 text-sm sm:text-base">
            Logout
          </span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-16 left-4 z-50 p-2 bg-richblack-800 text-white rounded-lg border border-richblack-700 hover:bg-richblack-700 transition-colors duration-200"
      >
        {isMobileMenuOpen ? <VscClose size={20} /> : <VscMenu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:block text-white bg-richblack-800 w-[15%] min-w-[200px] pt-12 border-r-2 border-richblack-700 overflow-hidden h-screen`}
      >
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed top-0 left-0 z-50 h-full w-64 sm:w-72 bg-richblack-800 border-r-2 border-richblack-700 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="pt-16 px-2">
          <SidebarContent />
        </div>
      </div>

      {open && (
        <ConfirmationModal
          modalData={{
            text1: "Are you sure?",
            text2: "You will be logged out of current session.",
            btn1text: "Logout",
            btn2text: "Cancel",
            btn1handler: () => dispatch(logout(navigate)),
            btn2handler: () => setOpen((prevState) => !prevState),
          }}
        />
      )}
    </>
  );
}
