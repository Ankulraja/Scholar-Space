import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import CourseCard from "./CourseCard";

const CourseSlider = ({ Courses }) => {
  return (
    <div className="w-full">
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          loop={Courses.length > 1}
          spaceBetween={20}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[Autoplay, Navigation, Pagination]}
          className="mySwiper"
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
        >
          {Courses?.map((course, index) => (
            <SwiperSlide key={index} className="h-auto">
              <CourseCard
                course={course}
                Height={"h-[200px] sm:h-[220px] lg:h-[250px]"}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="text-center py-8">
          <p className="text-richblack-300 text-lg">No Course Found</p>
        </div>
      )}
    </div>
  );
};

export default CourseSlider;
