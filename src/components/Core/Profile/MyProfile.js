import React from "react";
import { useSelector } from "react-redux";
import IconBtn from "../../Common/IconBtn";
import { useNavigate } from "react-router-dom";
import { RiEditBoxLine } from "react-icons/ri";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className="text-richblack-200 flex flex-col gap-6 sm:gap-8 lg:gap-10">
      <div className="text-2xl sm:text-3xl">My Profile</div>

      {/* Profile header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-richblack-800 p-4 sm:p-6 lg:p-9 rounded-md border-[1px] border-richblack-600 gap-4">
        <div className="flex items-center gap-3">
          <div>
            <img
              className="aspect-square rounded-full w-14 sm:w-16 "
              src={user?.image}
              alt=""
            />
          </div>

          <div>
            <h1 className="text-richblack-5 mb-1 sm:mb-2 text-base sm:text-lg">
              {user?.firstName} {user?.lastName}
            </h1>
            <p className="text-xs sm:text-sm break-all">{user?.email}</p>
          </div>
        </div>

        <div className="self-start sm:self-auto">
          <IconBtn
            onClick={() => navigate("/dashboard/settings")}
            text={"Edit"}
            active={true}
            customClasses={"flex gap-2 items-center font-semibold"}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
      </div>

      {/* About section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-richblack-800 p-4 sm:p-6 lg:p-9 rounded-md border-[1px] border-richblack-600 gap-4">
        <div className="flex items-start gap-3">
          <div>
            <h1 className="text-richblack-5 text-lg sm:text-xl font-medium mb-1 sm:mb-2">
              About
            </h1>
            <p className="text-sm sm:text-base">
              {user?.additionalDetails?.about
                ? user.additionalDetails.about
                : "Write something about yourself"}
            </p>
          </div>
        </div>

        <div className="self-start sm:self-auto">
          <IconBtn
            onClick={() => navigate("/dashboard/settings")}
            text={"Edit"}
            active={true}
            customClasses={"flex gap-2 items-center font-semibold"}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
      </div>

      {/* Personal details */}
      <div className="flex flex-col lg:flex-row justify-between bg-richblack-800 p-4 sm:p-6 lg:p-9 rounded-md border-[1px] border-richblack-600 gap-4">
        <div className="flex flex-col gap-3 flex-1">
          <div className="text-lg sm:text-xl text-richblack-5 mb-2 sm:mb-4">
            Personal Details
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 lg:gap-x-20 gap-y-4">
            <div>
              <h1 className="text-xs sm:text-sm">First Name</h1>
              <p className="text-richblack-5 text-sm sm:text-base font-medium mt-1 sm:mt-2 mb-2 sm:mb-4">
                {user?.firstName}
              </p>
            </div>

            <div>
              <h1 className="text-xs sm:text-sm">Last Name</h1>
              <p className="text-richblack-5 text-sm sm:text-base font-medium mt-1 sm:mt-2 mb-2 sm:mb-4">
                {user?.lastName}
              </p>
            </div>

            <div>
              <h1 className="text-xs sm:text-sm">Email</h1>
              <p className="text-richblack-5 text-sm sm:text-base font-medium mt-1 sm:mt-2 mb-2 sm:mb-4 break-all">
                {user?.email}
              </p>
            </div>

            <div>
              <h1 className="text-xs sm:text-sm">Phone Number</h1>
              <p className="text-richblack-5 text-sm sm:text-base font-medium mt-1 sm:mt-2 mb-2 sm:mb-4">
                {user?.additionalDetails?.contactNumber || "—"}
              </p>
            </div>

            <div>
              <h1 className="text-xs sm:text-sm">Gender</h1>
              <p className="text-richblack-5 text-sm sm:text-base font-medium mt-1 sm:mt-2 mb-2 sm:mb-4">
                {user?.additionalDetails?.gender || "—"}
              </p>
            </div>

            <div>
              <h1 className="text-xs sm:text-sm">Date of Birth</h1>
              <p className="text-richblack-5 text-sm sm:text-base font-medium mt-1 sm:mt-2 mb-2 sm:mb-4">
                {user?.additionalDetails?.dateOfBirth || "—"}
              </p>
            </div>
          </div>
        </div>

        <div className="self-start lg:self-auto">
          <IconBtn
            onClick={() => navigate("/dashboard/settings")}
            text={"Edit"}
            active={true}
            customClasses={"flex gap-2 items-center font-semibold"}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
