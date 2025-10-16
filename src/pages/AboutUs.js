import React from "react";
import { HighlighText } from "../components/Common/HighlighText";
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import FoundingStory from "../assets/Images/FoundingStory.png";
import { CTAButton } from "../components/Common/CTAButton";
import ContactUsSection from "../components/Core/Contact/ContactUsSection";
import Footer from "../components/Common/Footer";

const AboutUs = () => {
  return (
    <div className="text-richblack-200 w-full">
      <div className="w-11/12 max-w-6xl flex flex-col items-center mx-auto">
        <div className="bg-gradient-to-b from-richblack-700 to-richblack-900 w-full">
          <div className="flex flex-col items-center px-4">
            <p className="mb-6 sm:mb-8 mt-6 sm:mt-8 text-sm sm:text-base">
              About us
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-semibold text-white">
              Helping Student to get Online Degree for{" "}
              <br className="hidden sm:block" />
              <HighlighText text={"Brighter Future"} />
            </h1>
            <p className="w-full max-w-3xl text-center text-xs sm:text-sm mt-3">
              We assist students in pursuing online degrees for a brighter
              future, offering courses in Engineering Physics, Engineering
              Maths, Coding, and Core Subjects. Prepare for in-demand careers
              with flexible, accessible learning opportunities.
            </p>
          </div>

          <div className="flex gap-3 sm:gap-6 md:gap-10 mt-6 sm:mt-8 flex-col sm:flex-row justify-center items-center px-4">
            <img
              src={BannerImage1}
              alt=""
              className="w-full sm:w-auto max-w-[220px] sm:max-w-[260px] md:max-w-[300px]"
            />
            <img
              src={BannerImage2}
              alt=""
              className="w-full sm:w-auto max-w-[220px] sm:max-w-[260px] md:max-w-[300px]"
            />
            <img
              src={BannerImage3}
              alt=""
              className="w-full sm:w-auto max-w-[220px] sm:max-w-[260px] md:max-w-[300px]"
            />
          </div>
        </div>

        <div className="text-xl sm:text-2xl md:text-3xl text-center mt-10 sm:mt-16 mb-16 sm:mb-28 px-4">
          <p>
            <span className="text-2xl sm:text-3xl">"</span>We are passionate
            about revolutionizing the way we learn. Our{" "}
            <br className="hidden md:block" />
            innovative platform <HighlighText text={"combines technology, "} />
            <span className="bg-gradient-to-br from-[#FF512F] to-[#F09819] bg-clip-text font-semibold  text-transparent">
              expertise,
            </span>{" "}
            and community to
            <br className="hidden md:block" /> create an
            <span className="bg-gradient-to-br from-[#E65C00] to-[#F9D423] bg-clip-text font-semibold  text-transparent">
              {" "}
              unparalleled educational experience.
            </span>
            <span className="text-2xl sm:text-3xl">"</span>
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between gap-10 md:gap-6 w-11/12 md:w-full mb-16 md:mb-28 px-4">
          <div className="md:w-1/2">
            <h1 className="text-2xl sm:text-3xl mb-4 sm:mb-6 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text font-semibold  text-transparent">
              Our Founding Story
            </h1>
            <p className="text-justify text-sm">
              Our e-learning platform was born out of a shared vision and
              passion for transforming education. It all began with a group of
              educators, technologists, and lifelong learners who recognized the
              need for accessible, flexible, and high-quality learning
              opportunities in a rapidly evolving digital world.
              <br />
              <br />
              As experienced educators ourselves, we witnessed firsthand the
              limitations and challenges of traditional education systems. We
              believed that education should not be confined to the walls of a
              classroom or restricted by geographical boundaries. We envisioned
              a platform that could bridge these gaps and empower individuals
              from all walks of life to unlock their full potential.
            </p>
          </div>
          <div className="md:w-1/2 md:pl-6 flex justify-center">
            <img
              src={FoundingStory}
              className="w-full max-w-md sm:max-w-lg md:max-w-xl"
              alt="Founding Story"
            ></img>
          </div>
        </div>

        <div className="w-11/12 md:w-full flex flex-col md:flex-row gap-10 md:gap-32 px-4">
          <div className="md:w-1/2">
            <h1 className="text-2xl sm:text-3xl bg-gradient-to-br from-[#E65C00] to-[#F9D423] bg-clip-text font-semibold  text-transparent">
              Our Vision
            </h1>
            <p className="text-sm text-justify mt-2">
              Our vision is to empower students worldwide by providing
              accessible online education that prepares them for successful
              careers and a brighter future. We aim to bridge the gap between
              education and employment, enabling individuals to achieve their
              academic goals and contribute meaningfully to society.
            </p>
          </div>
          <div className="md:w-1/2">
            <h1 className="text-2xl sm:text-3xl">
              <HighlighText text={"Our Mission"} />
            </h1>
            <p className="text-sm text-justify mt-2">
              Our mission is to offer comprehensive online degree programs and
              courses in key disciplines such as Engineering Physics,
              Engineering Maths, Coding, and Core Subjects. We strive to deliver
              high-quality education with flexibility and affordability,
              ensuring students gain the skills and knowledge necessary to
              thrive in today's competitive job market.
            </p>
          </div>
        </div>

        <div className="flex justify-around flex-col sm:flex-row bg-gradient-to-b from-richblack-800 to-richblack-700 w-full min-h-32 sm:h-40 items-center mb-10 sm:mb-14 mt-10 sm:mt-14 gap-6 sm:gap-0 px-4">
          <div className="flex flex-col items-center">
            <p className="text-white text-2xl sm:text-3xl">5K</p>
            <p className="text-xs sm:text-sm font-semibold">Active Students</p>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-white text-2xl sm:text-3xl">30+</p>
            <p className="text-xs sm:text-sm font-semibold">Instructors</p>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-white text-2xl sm:text-3xl">50+</p>
            <p className="text-xs sm:text-sm font-semibold">Courses</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 w-11/12 md:w-full gap-4 md:gap-6 px-4">
          <div className="md:col-span-2 flex flex-col md:mr-20 ">
            <h1 className="text-2xl sm:text-3xl text-richblack-5 mb-3">
              World-Class Learning for <br className="hidden sm:block" />{" "}
              <HighlighText text={"Anyone, Anywhere"} />
            </h1>
            <p className="text-sm">
              ScholarSpace partners with leading universities and companies to
              bring flexible, affordable, job-relevant online degrees courses to
              individuals and organizations worldwide.
            </p>
            <div className="w-fit items-end mt-6 sm:mt-8">
              <CTAButton linkto={"/"} active={true}>
                {" "}
                Learn More
              </CTAButton>
            </div>
          </div>

          <div className="bg-richblack-700 p-5 sm:p-7">
            <h1 className="text-richblack-5 text-base sm:text-lg">
              Cirriculum based on <br />
              Industry Needs
            </h1>
            <p className="text-sm mt-6 sm:mt-8 mb-6 sm:mb-10">
              Save time and money! The Belajar curriculum is made to be easier
              to understand and in line with industry needs.
            </p>
          </div>

          <div className="bg-richblack-800 p-5 sm:p-7">
            <h1 className="text-richblack-5 text-base sm:text-lg">
              Our Learning <br />
              Methods
            </h1>
            <p className="text-sm mt-6 sm:mt-8 mb-6 sm:mb-10">
              The learning process uses the namely online and offline.
            </p>
          </div>

          <div className="hidden md:block"></div>

          <div className="bg-richblack-700 p-5 sm:p-7">
            <h1 className="text-richblack-5 text-base sm:text-lg">
              Certification
            </h1>
            <p className="text-sm mt-4 sm:mt-6 mb-6 sm:mb-10">
              <br className="hidden sm:block" />
              <br className="hidden sm:block" />
              You will get a certificate that can be used as a certification
              during job hunting.
            </p>
          </div>

          <div className="bg-richblack-800 p-5 sm:p-7">
            <h1 className="text-richblack-5 text-base sm:text-lg">
              Rating
              <br />
              "Auto-Grading"
            </h1>
            <p className="text-sm mt-6 sm:mt-8 mb-6 sm:mb-10">
              You will immediately get feedback during the learning process
              without having to wait for an answer or response from the mentor.
            </p>
          </div>

          <div className="bg-richblack-700 p-5 sm:p-7">
            <h1 className="text-richblack-5 text-base sm:text-lg">
              Ready to Work
            </h1>
            <p className="text-sm mt-4 sm:mt-5 mb-6 sm:mb-10">
              <br className="hidden sm:block" />
              <br className="hidden sm:block" />
              Connected with over 150+ hiring partners, you will have the
              opportunity to find a job after graduating from our program.
            </p>
          </div>
        </div>

        <ContactUsSection></ContactUsSection>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
