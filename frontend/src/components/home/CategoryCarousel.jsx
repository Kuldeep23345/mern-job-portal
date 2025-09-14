import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  "Frontedn Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <section>
      <Carousel className={"w-full md:max-w-xl max-w-3xs mx-auto  md:my-20 -my-6  "}>
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className={"md:basis-1/2 lg:basis-1/3 basis-1/2  "}
            >
              <Button
                onClick={() => searchJobHandler(cat)}
                variant={"outline"}
                className={
                  "rounded-full  md:text-base md:h-auto h-6 px-1.5 md:px-4 text-[12px]"
                }
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default CategoryCarousel;
