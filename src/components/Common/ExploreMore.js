import React, { useState } from "react";
import { HighlighText } from "./HighlighText";
import { HomePageExplore } from "../../data/homepage-explore";

const tabsName = [
  "Engineering Physics",
  "Engineering Maths",
  "Coding",
  "Core Subjects",
];

export const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setCards = (element) => {
    setCurrentTab(element);
    const result = HomePageExplore.filter((input) => input.tag === element);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div className="flex flex-col items-center z-10 w-11/12 mx-auto">
      <style>{`
        /* Hide scrollbar but keep scroll for tabs container */
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
      <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center">
        Unlock the <HighlighText text={"Power of Learning"} />
      </div>
      <div className="text-center text-xs sm:text-sm text-richblack-200 mt-3 sm:mt-4 max-w-2xl leading-relaxed">
        Learn to build anything you can imagine
      </div>
      <div className="w-full mt-5 sm:mt-6">
        <div className="flex bg-richblack-800 p-1 rounded-full gap-2 sm:gap-4 overflow-x-auto hide-scrollbar whitespace-nowrap justify-start md:justify-center px-2">
          {tabsName.map((element, index) => {
            return (
              <div
                key={index}
                onClick={() => setCards(element)}
                className={`${
                  currentTab === element
                    ? "text-richblack-5 bg-richblack-900 rounded-full"
                    : "text-richblack-200"
                }
                        py-2 px-3 sm:px-6 flex flex-row text-xs sm:text-sm md:text-base transition-all duration-200
                        hover:bg-richblack-900 hover:text-richblack-5 rounded-full`}
              >
                {element}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 justify-center mt-8 sm:mt-10 w-full">
        {courses.map((element, index) => {
          return (
            <div
              key={index}
              onClick={() => setCards(element)}
              className={`w-full min-h-[260px] sm:min-h-[280px] flex flex-col justify-between px-4 pt-4 pb-2 bg-white text-richblack-300 rounded-lg
                        ${
                          courses === element
                            ? "drop-shadow-xl shadow-yellow-700"
                            : "shadow-white"
                        }`}
            >
              <div>
                <div className="text-richblack-900 font-semibold text-base sm:text-lg">
                  {element.heading}
                </div>
                <div className="text-xs sm:text-sm">{element.description}</div>
              </div>

              <div>
                <div className="border-dashed border mt-8 sm:mt-14 mb-1"></div>
                <div className="flex flex-row justify-between text-xs sm:text-sm">
                  <div className="text-blue-300 font-semibold">
                    {element.level}
                  </div>
                  <div className="text-blue-300 font-semibold">
                    {element.lessionNumber} Lessons
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
