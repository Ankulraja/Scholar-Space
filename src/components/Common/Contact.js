import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import CountryCode from "../../data/countrycode.json";
import ApiConnector from "../../services/ApiConnector";
import { contactusEndpoint } from "../../services/Api";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstname: "",
        lastname: "",
        email: "",
        phoneno: "",
        message: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  const { CONTACT_US_API } = contactusEndpoint;
  const onSubmitHandler = async (data) => {
    try {
      setLoading(true);
      const res = await ApiConnector("POST", CONTACT_US_API, data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmitHandler)} className="w-full">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="w-full">
            <label
              htmlFor="firstname"
              className="text-sm font-medium text-richblack-300 block mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              placeholder="Enter First Name"
              name="firstname"
              id="firstname"
              className="w-full rounded-md py-2 sm:py-3 px-3 bg-richblack-700 text-richblack-5 placeholder-richblack-400 border border-richblack-600 focus:outline-none focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50 transition-all duration-200"
              {...register("firstname", { required: true })}
            />
            {errors.firstname && (
              <span className="text-xs text-pink-300 mt-1 block">
                Please enter your first name
              </span>
            )}
          </div>

          <div className="w-full">
            <label
              htmlFor="lastname"
              className="text-sm font-medium text-richblack-300 block mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              name="lastname"
              id="lastname"
              className="w-full rounded-md py-2 sm:py-3 px-3 bg-richblack-700 text-richblack-5 placeholder-richblack-400 border border-richblack-600 focus:outline-none focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50 transition-all duration-200"
              {...register("lastname", { required: true })}
            />
            {errors.lastname && (
              <span className="text-xs text-pink-300 mt-1 block">
                Please enter your last name
              </span>
            )}
          </div>
        </div>

        <div className="mb-3 sm:mb-4">
          <label
            htmlFor="email"
            className="text-sm font-medium text-richblack-300 block mb-1"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            className="w-full rounded-md py-2 sm:py-3 px-3 bg-richblack-700 text-richblack-5 placeholder-richblack-400 border border-richblack-600 focus:outline-none focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50 transition-all duration-200"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-xs text-pink-300 mt-1 block">
              Please enter your email
            </span>
          )}
        </div>

        <div className="mb-3 sm:mb-4">
          <label
            htmlFor="phonenumber"
            className="text-sm font-medium text-richblack-300 block mb-1"
          >
            Phone Number
          </label>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <select
              name="dropdown"
              id="dropdown"
              className="w-full sm:w-[30%] lg:w-[25%] rounded-md py-2 sm:py-3 px-2 sm:px-3 bg-richblack-700 text-richblack-5 border border-richblack-600 focus:outline-none focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50 transition-all duration-200 text-sm"
              {...register("countrycode", { required: true })}
            >
              {CountryCode.map((element, index) => {
                return (
                  <option
                    key={index}
                    value={element.code}
                    className="bg-richblack-700"
                  >
                    {element.code} -{element.country}
                  </option>
                );
              })}
            </select>

            <input
              type="text"
              placeholder="12345 67890"
              name="phonenumber"
              id="phonenumber"
              className="w-full rounded-md py-2 sm:py-3 px-3 bg-richblack-700 text-richblack-5 placeholder-richblack-400 border border-richblack-600 focus:outline-none focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50 transition-all duration-200"
              {...register("phoneno", {
                required: { value: true, message: "Please enter phone number" },
                maxLength: { value: 10, message: "Invalid Phone Number" },
                minLength: { value: 10, message: "Invalid Phone Number" },
              })}
            />
          </div>
          {errors.phoneno && (
            <span className="text-xs text-pink-300 mt-1 block">
              {errors.phoneno.message}
            </span>
          )}
        </div>

        <div className="mb-4 sm:mb-5">
          <label
            htmlFor="message"
            className="text-sm font-medium text-richblack-300 block mb-1"
          >
            Message
          </label>
          <textarea
            name="message"
            id="message"
            cols="30"
            className="w-full rounded-md py-2 sm:py-3 px-3 bg-richblack-700 text-richblack-5 placeholder-richblack-400 border border-richblack-600 focus:outline-none focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50 transition-all duration-200 resize-none"
            rows="6"
            placeholder="Enter your message here"
            {...register("message", { required: true })}
          ></textarea>
          {errors.message && (
            <span className="text-xs text-pink-300 mt-1 block">
              Please enter your message
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 sm:px-6 py-2 sm:py-3 text-center rounded-md transition-all duration-200 hover:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 bg-yellow-50 text-black hover:shadow-sm hover:shadow-brown-25 font-semibold w-full mt-4 sm:mt-5 text-sm sm:text-base"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default Contact;
