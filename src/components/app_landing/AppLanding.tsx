"use client"

import { FaStarOfLife } from "react-icons/fa6";
import BannerSection from "./BannerSection";
import Heading from "../shared_components/DecoratorDash";
import StyleSection from "./StyleSection";
import CategoriesSection from "./CategoriesSection";
import HeroCarouselSection from "./HeroCarouselSection";
import FeaturedProductsSection from "../FeaturedProductsSection";




export default function AppLanding() {
  return (
    <>
      <HeroCarouselSection />
      <div className="container mx-auto py-10">
        <Heading showDash className="py-10" title="" description="">
          Browse through our carefully carted collection of high-quality
          clothing & accessories featuring the latest trends and style
        </Heading>
        <FeaturedProductsSection>Trending Products</FeaturedProductsSection>
      </div>
      <CategoriesSection />
      <div className="container mx-auto py-10">
        <StyleSection />
        <FeaturedProductsSection>Best Selling Items</FeaturedProductsSection>
        <FeaturedProductsSection>You May Also Like</FeaturedProductsSection>
      </div>
      {/* <BannerSection /> */}
    </>
  )
}