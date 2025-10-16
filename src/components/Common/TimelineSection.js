import React from "react";
import Logo1 from "../../assets/TimeLineLogo/Logo1.svg";
import Logo3 from "../../assets/TimeLineLogo/Logo3.svg";
import Logo2 from "../../assets/TimeLineLogo/Logo2.svg";
import Logo4 from "../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../assets/Images/TimelineImage.png";

const timeline = [
  {
    Logo: Logo1,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    heading: "Responsibility",
    Description: "Students will always be our top priority",
  },
  {
    Logo: Logo3,
    heading: "Flexibility",
    Description: "The ability to switch is an important skills",
  },
  {
    Logo: Logo4,
    heading: "Solve the problem",
    Description: "Code your way to a solution",
  },
];

export const TimelineSection = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:items-center mx-auto bg-pure-greys-5 w-11/12 max-w-6xl
     text-richblack-900 pt-14 md:pt-20 gap-10 max-md:pb-6
     md:gap-20 lg:gap-32 mb-16 md:mb-28">
      <div className="mt-6 md:mt-20 w-full md:w-auto">
        {timeline.map((element, index) => {
          return (
            <div key={index} className="flex items-center gap-4 text-sm">
              <div className="flex flex-col items-center mt-2 gap-2">
                <div
                  className={`${
                    index > 0 ? "block" : "hidden"
                  } h-6 md:h-8 border-l w-1 border-dashed `}
                ></div>
                <div className="w-[40px] h-[40px] md:w-[45px] md:h-[45px] rounded-full bg-white flex items-center justify-center">
                  <img src={element.Logo} alt="timeline-icon" />
                </div>
              </div>
              <div className="pt-5 md:pt-7">
                <h1 className="text-sm md:text-md font-semibold">
                  {element.heading}
                </h1>
                <p className="text-xs md:text-sm text-richblack-600">
                  {element.Description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full md:w-auto">
        <div className="relative">
          <img
            className="w-full max-w-md md:max-w-lg lg:max-w-xl h-auto object-contain mx-auto md:mx-0"
            src={timelineImage}
            alt="timeline"
          />

          <div className="absolute left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:translate-y-0 md:right-0 md:top-4 lg:top-8 flex py-4 md:py-6 lg:py-7 bg-caribbeangreen-700 text-white rounded-md shadow-md mt-2 -translate-y-6 md:static">
            <div className="flex gap-4 md:gap-5 px-5 md:px-7 items-center border-r">
              <div className="text-2xl md:text-3xl font-semibold ">30+</div>
              <div className="text-xs md:text-sm text-caribbeangreen-200">
                Experienced
                <br /> Professors
              </div>
            </div>
            <div className="flex gap-4 md:gap-5 px-5 md:px-7 items-center">
              <div className="text-2xl md:text-3xl font-semibold ">50+</div>
              <div className="text-xs md:text-sm text-caribbeangreen-200">
                TYPES OF <br />
                COURSES
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
