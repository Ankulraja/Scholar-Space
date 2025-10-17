import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/AuthApi/AuthApi";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token, navigate));
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] text-richblack-200 flex items-center justify-center py-6 sm:py-10 px-3 sm:px-4">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="w-11/12 sm:w-10/12 md:w-2/3 lg:w-[25%] max-w-md">
          <h1 className="text-richblack-5 text-2xl sm:text-3xl mb-2 sm:mb-3 font-medium">
            Choose New Password
          </h1>
          <p className="text-richblack-200 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
            Almost done. Enter your new password and youre all set.
          </p>

          <form className="text-richblack-50" onSubmit={handleOnSubmit}>
            <label className="text-xs sm:text-sm">
              <p>
                New password <sup className="text-pink-200">*</sup>
              </p>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handleOnChange}
                  placeholder="Enter password"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full mt-1 mb-4 sm:mb-5 rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                  className="absolute inset-y-0 right-3 flex items-center text-richblack-100 text-lg sm:text-xl"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>
            </label>

            <label className="text-xs sm:text-sm">
              <p>
                Confirm new password <sup className="text-pink-200">*</sup>
              </p>
              <div className="relative">
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={handleOnChange}
                  placeholder="Enter password"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full mt-1 mb-1 sm:mb-2 rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((prevState) => !prevState)
                  }
                  className="absolute inset-y-0 right-3 flex items-center text-richblack-100 text-lg sm:text-xl"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </button>
              </div>
            </label>

            <button
              type="submit"
              className="mt-5 sm:mt-6 w-full mb-2 sm:mb-3 rounded-[8px] font-semibold bg-yellow-50 py-[10px] px-[14px] text-richblack-900"
            >
              Reset Password
            </button>

            <Link
              to={"/login"}
              className="flex items-center text-xs sm:text-sm gap-1 mt-1 sm:mt-2"
            >
              <BiArrowBack />
              <p>Back to login</p>
            </Link>
          </form>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
