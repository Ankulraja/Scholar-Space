import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HighlighText } from "../components/Common/HighlighText";
import { CTAButton } from "../components/Common/CTAButton";
import Banner from "../assets/Images/banner.mp4";
import { CodeBlocks } from "../components/Common/codeBlocks";
import { ExploreMore } from "../components/Common/ExploreMore";
import { TimelineSection } from "../components/Common/TimelineSection";
import Instructor from "../assets/Images/Instructor.png";
import Footer from "../components/Common/Footer";
import CourseReviewSlider from ".././components/Common/courseReviewSlider";

export const Home = () => {
  return (
    <div>
      <div className="relative w-11/12 mx-auto flex flex-col items-center max-w-maxContent mb-5 mt-12 sm:mt-20 text-white justify-between px-3 sm:px-6">
        <Link to={"/signup"}>
          <div className="group p-1 text-richblack-200 bg-richblack-800  rounded-full transition-all duration-200 hover:scale-95 w-fit">
            <button className="flex items-center gap-2 font-semibold sm:font-bold transition-all duration-200 group-hover:bg-richblack-900 py-[6px] sm:py-[8px] px-6 sm:px-10 rounded-full text-xs sm:text-sm md:text-base">
              Become An Instructor{" "}
              <span>
                <FaArrowRight />
              </span>
            </button>
          </div>
        </Link>

        <div className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mt-6 text-center leading-tight sm:leading-snug">
          Empower Your Future with <br className="hidden md:block" />
          <HighlighText text={"Coding Skills"} />
        </div>

        <div className="w-full max-w-3xl px-2 text-xs sm:text-sm md:text-base mt-3 text-center text-richblack-200 font-medium leading-relaxed sm:leading-7">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          experienced instructors.
        </div>

        <div className="w-full max-w-4xl mt-8 sm:mt-10 aspect-video">
          <video
            className="w-full h-full rounded-md"
            muted
            loop
            autoPlay
            playsInline
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        <div className="w-full mt-14 text-white px-2">
          <CodeBlocks
            heading={
              <div>
                Unlock Your
                <HighlighText text={" coding potential "} />
                with our online courses
              </div>
            }
            subHeading={
              "Our courses are designed and taught by college instructors who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            button1={
              <CTAButton linkto={"/catalog/engineering-physics"} active={true}>
                <div className="flex items-center gap-2">
                  Try It Yourself <FaArrowRight />
                </div>
              </CTAButton>
            }
            button2={
              <CTAButton linkto={"/catalog/engineering-physics"} active={false}>
                Learn More
              </CTAButton>
            }
            codeBlock={`<<!DOCTYPE html">\n<html>\n<head>\n<title>Example</title>\n<link rel="stylesheet "href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="one">One</a> <a href="two">Two</a>\n<a href="three">Three</a>\n</nav>`}
            codeColor={"text-yellow-25"}
            position={"flex-col md:flex-row"}
          />
        </div>
      </div>

      <div className="w-11/12 max-w-7xl mt-12 sm:mt-24 text-white flex flex-col items-center mx-auto relative">
        <ExploreMore />

        <div className="w-full bg-pure-greys-5 -translate-y-6 sm:-translate-y-10 lg:-translate-y-14 flex flex-col items-center">
          <div className="bgHome w-full h-auto py-6 sm:py-8 lg:h-[250px] flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6 lg:gap-8 justify-center items-center px-3 sm:px-4 w-11/12 max-w-3xl mx-auto">
            <CTAButton linkto={"/catalog/engineering-physics"} active={true}>
              <div className="flex items-center gap-2 text-sm sm:text-base">
                Explore full catolog
                <FaArrowRight />
              </div>
            </CTAButton>
            <CTAButton linkto={"/catalog/engineering-physics"} active={false}>
              <span className="text-sm sm:text-base">Learn more</span>
            </CTAButton>
          </div>

          <div className="flex justify-center bg-pure-greys-5 w-full pt-8 sm:pt-10 px-3 sm:px-4">
            <div className="text-richblack-900 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-10 lg:gap-24 max-w-6xl w-full items-start md:items-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-semibold leading-snug text-center md:text-left">
                Get the skills you need for a <br className="hidden sm:block" />
                <HighlighText text={"job that is in demand."} />
              </div>
              <div className="text-sm sm:text-base leading-relaxed text-center md:text-left">
                <p>
                  Acquire essential skills for high-demand jobs with courses on
                  ScholarSpace.
                </p>
              </div>
            </div>
          </div>
          <TimelineSection />
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-24 items-center w-11/12 mx-auto mt-8 sm:mt-12">
          <div className="w-full md:w-1/2 shadow-white shadow-xl rounded-md overflow-hidden">
            <img
              className="w-full h-auto object-contain max-h-[360px] sm:max-h-[420px]"
              src={Instructor}
              alt="Instructor"
            />
          </div>
          <div className="flex flex-col justify-center w-full md:w-1/2 px-1 sm:px-2 text-center md:text-left">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4">
              Become an <br />
              <HighlighText text={"Instructor"} />
            </h1>
            <p className="text-sm sm:text-base leading-relaxed">
              Instructors of colleges can teach millions of students with the
              help <br /> of ScholarSpace. We provide the tools and skills to
              teach what you love.
            </p>
            <div className="mt-6 sm:mt-8 w-fit mx-auto md:mx-0">
              <CTAButton linkto={"/dashboard/my-profile"} active={true}>
                <div className="flex items-center gap-2 text-sm sm:text-base">
                  Start Teaching Today
                  <FaArrowRight />
                </div>
              </CTAButton>
            </div>
          </div>
        </div>
      </div>

      <CourseReviewSlider />

      <Footer />
    </div>
  );
};
