import React from "react";
import ContactDetails from "../components/Core/Contact/ContactDetails";
import Contact from "../components/Common/Contact";
import Footer from "../components/Common/Footer";

const ContactUs = () => {
  return (
    <div className="mt-14">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-8 justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="w-full lg:w-[35%]">
          <ContactDetails />
        </div>
        <div className="w-full lg:w-[45%] text-richblack-200 outline-1 rounded-md p-4 sm:p-6 lg:p-7 outline outline-richblack-600">
          <h1 className="text-richblack-5 text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
            Have a doubt regarding courses
          </h1>
          <p className="mb-4 sm:mb-5 text-sm sm:text-base">
            Tell us more about yourself and what you're stuck at.
          </p>
          <Contact />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;
