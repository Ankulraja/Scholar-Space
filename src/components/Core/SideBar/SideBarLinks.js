import * as Icons from "react-icons/vsc";
import { NavLink, matchPath, useLocation } from "react-router-dom";

export default function SideBarLinks({ name, iconName, path, onClick }) {
  const Icon = Icons[iconName];
  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div
      className={`relative pl-4 sm:pl-7 mb-1 sm:mb-2 py-2 sm:py-[7px] text-sm font-medium rounded-r-lg hover:bg-richblack-700 transition-all duration-200 ${
        matchRoute(path)
          ? "bg-yellow-800 text-yellow-50 border-l-2 font-medium border-yellow-50"
          : "bg-opacity-0 text-richblack-300 border-l-2 font-medium border-richblack-800"
      }`}
    >
      <NavLink
        to={path}
        className="flex gap-2 sm:gap-3 items-center"
        onClick={onClick}
      >
        <Icon className="text-base flex-shrink-0" />
        <div className="text-sm sm:text-base truncate">{name}</div>
      </NavLink>
    </div>
  );
}
