import React from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import CourseInformationForm from "./AddForm/CourseInformationForm";
import CourseBuilderForm from "./AddForm/CourseBuilderForm";
import PublishCourse from "./AddForm/PublishCourse";

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);
  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish!!!",
    },
  ];

  return (
    <div className="">
      <div className="flex flex-col">
        <div className="flex items-center px-4 sm:px-6 lg:px-10 w-full">
          {steps.map((item, index) => (
            <React.Fragment key={item.id}>
              <div
                className={`${
                  step === item.id
                    ? "bg-yellow-900 border-yellow-50 text-yellow-50 border"
                    : "border-richblack-700 bg-richblack-800 text-richblack-300"
                } rounded-full w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 flex items-center justify-center text-xs sm:text-sm lg:text-base`}
              >
                {step > item.id ? <FaCheck /> : item.id}
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`mx-2 sm:mx-3 flex-1 h-[2px] ${
                    step > item.id || step === item.id
                      ? "text-white"
                      : "text-richblack-200"
                  }`}
                  style={{
                    backgroundImage:
                      "radial-gradient(currentColor 1.5px, transparent 1.5px)",
                    backgroundSize: "8px 2px",
                    backgroundRepeat: "repeat-x",
                    backgroundPosition: "center",
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="flex justify-between text-xs sm:text-sm mt-2 mb-8 sm:mb-12 lg:mb-16 px-1 sm:px-4">
          {steps.map((item) => (
            <div
              key={item.id}
              className={`${
                step === item.id ? "text-richblack-5" : "text-richblack-200"
              }`}
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>

      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </div>
  );
};

export default RenderSteps;
