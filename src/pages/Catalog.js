import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiConnector from "../services/ApiConnector";
import { categories } from "../services/Api";
import { fetchCatalogPageData } from "../services/AuthApi/CourseApi";
import CourseSlider from "../components/Common/CourseSlider";
import CourseCard from "../components/Common/CourseCard";
import Footer from "../components/Common/Footer";
import toast from "react-hot-toast";

const Catalog = () => {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryID, setCategoryID] = useState("");

  async function getCategories() {
    try {
      var res = await ApiConnector("GET", categories.CATEGORIES_API);
    } catch (error) {
      toast.error("Could Not Get Categories");
    }
    const categoryID = res?.data?.allCategorys?.filter(
      (ct) => ct.title.split(" ").join("-").toLowerCase() === catalogName
    )[0]._id;
    setCategoryID(categoryID);
  }
  useEffect(() => {
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    async function catalogPageDetails() {
      try {
        const result = await fetchCatalogPageData(categoryID);
        setCatalogPageData(result);
      } catch (error) {
        throw new Error("Could not fetch catalog page data");
      }
    }

    if (categoryID) {
      catalogPageDetails();
    }
  }, [categoryID]);

  return (
    <div className="text-white">
      <div className="bg-richblack-800 px-4 sm:px-6 lg:px-36 mb-8 sm:mb-14">
        <p className="pt-16 sm:pt-20 text-richblack-300 text-sm sm:text-base">
          {`Home / Catalog / `}
          <span className="text-yellow-50">
            {catalogPageData?.selectedCategory?.title}
          </span>
        </p>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl py-3 sm:py-4 font-semibold">
          {catalogPageData?.selectedCategory?.title}
        </h2>
        <p className="text-richblack-300 pb-8 sm:pb-14 text-sm sm:text-base leading-relaxed">
          {catalogPageData?.selectedCategory?.description}
        </p>
      </div>

      <div className="px-4 sm:px-6 lg:px-36">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
          Courses to get you started
        </h1>
        <div>
          <CourseSlider Courses={catalogPageData?.selectedCategory?.course} />
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-36">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 mt-12 sm:mt-16 lg:mt-20">
          Top Courses in {catalogPageData?.differentCategory?.title}
        </h1>
        <div>
          <CourseSlider Courses={catalogPageData?.differentCategory?.course} />
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-36">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 mt-12 sm:mt-16 lg:mt-20">
          Frequently Bought
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {catalogPageData?.mostSellingCourses
            ?.splice(0, 4)
            .map((course, index) => {
              return (
                <CourseCard
                  course={course}
                  key={index}
                  Height={"h-[300px] sm:h-[350px] lg:h-[400px]"}
                />
              );
            })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Catalog;
