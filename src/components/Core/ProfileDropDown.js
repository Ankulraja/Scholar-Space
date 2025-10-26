import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/AuthApi/AuthApi";
import useOnClickOutside from "../../customHooks/useOnClickOutside";

const ProfileDropDown = () => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpen(false));

  if (!user) return null;

  return (
    <div className="relative">
      <button
        className="relative w-full max-md:border max-md:border-richblack-700 max-md:bg-richblack-800 max-md:px-3 max-md:py-2 max-md:rounded-md max-md:h-10"
        onClick={() => setOpen((prevState) => !prevState)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <div className="flex items-center w-full justify-between">
          <div className="relative w-7 h-7 rounded-full overflow-hidden">
            <img
              src={user?.image}
              alt={`Profile-${user?.firstName}`}
              className="w-full h-full object-cover"
            />
          </div>
          <AiOutlineCaretDown />
        </div>
      </button>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute right-0 z-[1000] sm:z-[1000] w-[220px] sm:w-[240px] max-w-[90vw] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800 bottom-full mb-2 top-auto sm:top-full sm:mt-2 sm:bottom-auto sm:mb-0"
          ref={ref}
          role="menu"
        >
          <Link
            to="/dashboard/my-profile"
            onClick={() => setOpen(false)}
            role="menuitem"
          >
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          <div
            onClick={() => {
              dispatch(logout(navigate));
              setOpen(false);
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
            role="menuitem"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropDown;
