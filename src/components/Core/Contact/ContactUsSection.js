import React from "react";
import Contact from "../../Common/Contact";

const ContactUsSection = () => {
  return (
    <div className="w-full max-w-xl sm:max-w-2xl md:max-w-3xl flex flex-col items-center mt-16 sm:mt-24 mx-auto px-4">
      <h1 className="text-richblack-5 text-2xl sm:text-3xl text-center font-semibold">
        Get in Touch
      </h1>
      <p className="mb-8 sm:mb-10 text-center text-sm sm:text-base">
        We’d love to hear from you. Please fill out this form.
      </p>
      <div className="w-full">
        <Contact />
      </div>
    </div>
  );
};

export default ContactUsSection;
