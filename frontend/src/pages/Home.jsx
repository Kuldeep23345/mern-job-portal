import React from "react";

import HeroSection from "@/components/home/HeroSection";
import CategoryCarousel from "@/components/home/CategoryCarousel";
import LatestJobs from "@/components/home/LatestJobs";
import Footer from "@/components/footer/Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Home = () => {
  useGetAllJobs()
  return (
    <>
      <main>
        <HeroSection />
        <CategoryCarousel />
        <LatestJobs />
      </main>
      <Footer />
    </>
  );
};

export default Home;
