import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AvgRating from "../../services/AvgRating";
import RatingStars from "./RatingStars";

const CourseCard = ({ course, Height }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  useEffect(() => {
    const count = AvgRating(course.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);
  return (
    <div className="w-full group hover:scale-105 transition-transform duration-300">
      <Link to={`/courses/${course._id}`} className="block">
        <div className="bg-richblack-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="relative overflow-hidden">
            <img
              src={course.thumbnail}
              alt={course?.courseName}
              className={`${Height} w-full rounded-t-lg object-cover group-hover:scale-110 transition-transform duration-300`}
            />
          </div>

          <div className="p-3 sm:p-4 flex flex-col gap-2 sm:gap-3">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-richblack-5 line-clamp-2 group-hover:text-yellow-50 transition-colors duration-300">
              {course?.courseName}
            </h3>
            <p className="text-sm sm:text-base text-richblack-300">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1">
                <span className="text-sm sm:text-base font-medium text-yellow-50">
                  {avgReviewCount || 0}
                </span>
                <RatingStars avgReviewCount={avgReviewCount} />
              </div>
              <span className="text-xs sm:text-sm text-richblack-400">
                ({course?.ratingAndReviews?.length || 0})
              </span>
            </div>
            <p className="text-lg sm:text-xl font-bold text-yellow-50 mt-1">
              Rs. {course?.price}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
