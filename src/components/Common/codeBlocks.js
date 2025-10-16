import React from "react";
import { TypeAnimation } from "react-type-animation";

export const CodeBlocks = ({
  heading,
  subHeading,
  button1,
  button2,
  codeBlock,
  codeColor,
  position,
}) => {
  return (
    <div
      className={`flex ${position} justify-between gap-6 md:gap-12 mx-auto w-11/12 md:w-[90%]`}
    >
      <div className="w-full md:w-[36%]">
        <div className="text-2xl sm:text-3xl">{heading}</div>
        <div className="text-richblack-200 mt-2 mb-6 sm:mb-10 md:mb-16 text-sm sm:text-base">
          {subHeading}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {button1}
          {button2}
        </div>
      </div>

      <div className="flex flex-row w-full md:w-[38%] borde border-richblack-25 gap-1 mt-6 md:mt-0">
        <div>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
          <p>12</p>
        </div>

        <div>
          <TypeAnimation
            sequence={[codeBlock, 1000, ""]}
            repeat={Infinity}
            cursor={true}
            omitDeletionAnimation={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  );
};
