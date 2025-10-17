import React from "react";
import RenderSteps from "./RenderSteps";
import { MdElectricBolt } from "react-icons/md";

const AddCourses = () => {
  return (
    <div className="text-white flex flex-col lg:flex-row w-full items-start gap-6 lg:gap-10">
      <div className="flex flex-col w-full lg:w-[60%]">
        <h1 className="text-2xl sm:text-3xl font-medium mb-6 sm:mb-10 lg:mb-14">
          Add Course
        </h1>
        <div>
          <RenderSteps />
        </div>
      </div>
      <div className="sticky top-20 lg:top-10 h-fit bg-richblack-800 border border-richblack-600 rounded-md p-4 sm:p-5 w-full lg:w-[40%]">
        <div className="flex items-baseline mb-4 sm:mb-6">
          <MdElectricBolt className="text-brown-50 mr-2" />
          <p className="text-base sm:text-lg">Code Upload Tips</p>
        </div>
        <ul className="text-richblack-200 text-sm flex flex-col gap-2 sm:gap-3">
          <li>Set the Course Price option or make it free.</li>
          <li>Standard size for the course thumbnail is 1024x576.</li>
          <li>Video section controls the course overview video.</li>
        </ul>
      </div>
    </div>
  );
};

export default AddCourses;
