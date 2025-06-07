"use client"
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselApi } from "@/components/ui/carousel"; // Assuming you're using Shadcn carousel
import clsx from "clsx";
import Image from "next/image"; // If you're using Next.js
import React from "react";
import { BsArrowRight, BsArrowUpRight } from "react-icons/bs";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";

const categoryClassNames = `text-[2.312rem] text-[#222222] capitalize font-family`;
const salesClassNames = `relative inline-block w-2/4 before:content-[''] before:w-3/4 before:border-b before:border-[#111] before:absolute before:bottom-0
  after:content-['SALE'] after:text-[0.687rem] after:leading-[0.3em] after:tracking-[0.3em] after:uppercase after:text-[#252525] after:absolute after:bottom-0 after:right-0`;



export default function BannerSection() {

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => setCurrent(api.selectedScrollSnap() + 1));
  }, [api]);

  return (
    <>
      {/*  */}
      <section className="py-5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* First Banner */}
            <div className="bg-danger rounded-2xl overflow-hidden bg-gray-100">
              <div className="p-8">
                <div className="text-primary text-3xl font-bold">Upto 25% Off</div>
                <h3 className="text-2xl font-semibold mt-2">Luxa Dark Chocolate</h3>
                <p className="text-base mt-2">Very tasty & creamy vanilla flavour creamy muffins.</p>
                <Button variant="default" className="bg-black uppercase mt-4">Shop Now</Button>
              </div>
            </div>

            {/* Second Banner */}
            <div className="bg-info rounded-2xl overflow-hidden bg-gray-100">
              <div className="p-8">
                <div className="text-primary text-3xl font-bold">Upto 25% Off</div>
                <h3 className="text-2xl font-semibold mt-2">Creamy Muffins</h3>
                <p className="text-base mt-2">Very tasty & creamy vanilla flavour creamy muffins.</p>
                <Button variant="default" className="bg-black uppercase mt-4">Shop Now</Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* BannerBlocks */}

      <section
        className="py-3 bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/images/background-pattern.jpg')" }}
      >
        <div className="container mx-auto p-4">
          <div className="grid lg:grid-cols-2 gap-4">

            {/* Main Banner with Carousel */}
            <div className="banner-content rounded-2xl overflow-hidden bg-blue-200 pb-6 flex flex-col justify-center">
              <Carousel setApi={setApi} className="relative w-full h-full px-7 pt-7 pb-1 [&>div]:w-full [&>div]:h-full">
                <CarouselContent className="w-full h-full">
                  {/* Slide 1 */}
                  <CarouselItem className="relative">
                    <div className="content-wrapper w-3/4 px-3 py-2">
                      <div className={`${categoryClassNames} my-3`}>100% natural</div>
                      <h3 className="banner-title text-[2.937rem] leading-12 tracking-[0.02em] mb-4">Fresh Smoothie & Summer Juice</h3>
                      <p className="mt-2 text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim massa diam elementum.</p>
                      <Button variant={"outline"} size={"lg"} className="uppercase text-sm rounded-md px-6 py-3 mt-6">Shop Now</Button>
                    </div>
                    <div className="absolute top-0 bottom-0 -right-4 -z-10 w-2/4 min-h-full rounded-md">
                      <Image src="/images/product-thumb-1.png" alt="Product Thumbnail" fill
                        className="object-contain bg-gray-300" />
                    </div>
                  </CarouselItem>

                  {/* Slide 2 */}
                  <CarouselItem className="relative">
                    <div className="content-wrapper w-3/4 px-3 py-2">
                      <div className={`${categoryClassNames} my-3`}>100% natural</div>
                      <h3 className="banner-title text-[2.937rem] leading-12 tracking-[0.02em] mb-4">Heinz Tomato Ketchup</h3>
                      <p className="mt-2 text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim massa diam elementum.</p>
                      <Button variant={"outline"} size={"lg"} className="uppercase text-sm rounded-md px-6 py-3 mt-6">Shop Now</Button>
                    </div>
                    <div className="absolute top-0 bottom-0 -right-4 -z-10 w-2/4 min-h-full rounded-md">
                      <Image src="/images/product-thumb-2.png" alt="Product Thumbnail" fill
                        className="object-contain bg-gray-300" />
                    </div>
                  </CarouselItem>

                </CarouselContent>
                <CarouselPrevious className="mx-7 top-[calc(100%+0.5rem)] translate-y-0 left-0" />
                <CarouselNext className="mx-7 top-[calc(100%+0.5rem)] translate-y-0 left-2 translate-x-full" />
              </Carousel>
              <div className="mt-4 px-7 flex items-center justify-end gap-2">
                {Array.from({ length: count }).map((_, index) => (
                  <button key={index} onClick={() => api?.scrollTo(index)}
                    className={cn("h-3.5 w-3.5 rounded-full border-2", { "border-primary": current === index + 1 })}
                  />
                ))}
              </div>

            </div>

            {/* Small Banners */}
            <div className="grid gap-4">
              {/* Fruits & Vegetables */}
              <div className="banner-content rounded-2xl overflow-hidden bg-green-100 p-7 flex flex-col justify-center">
                <div className="content-wrapper w-3/4 px-3 py-2">
                  <div className={`${categoryClassNames} ${salesClassNames} mb-3 pb-3`}>20% off</div>
                  <h3 className="banner-title text-[2.062rem] leading-8 tracking-[0.02em] mb-4">Fruits & Vegetables</h3>
                  <a href="#" className="w-fit flex items-center text-primary font-semibold gap-3">
                    Shop Collection <BsArrowUpRight className="rotate-45 mt-1" />
                  </a>
                </div>
              </div>

              {/* Baked Products */}
              <div className="banner-content rounded-2xl overflow-hidden bg-red-100 p-7 flex flex-col justify-center">
                <div className="content-wrapper w-3/4 px-3 py-2">
                  <div className={`${categoryClassNames} ${salesClassNames} mb-3 pb-3`}>15% off</div>
                  <h3 className="banner-title text-[2.062rem] leading-8 tracking-[0.02em] mb-4">Baked Products</h3>
                  <a href="#" className="w-fit flex items-center text-primary font-semibold gap-3">
                    Shop Collection <BsArrowUpRight className="rotate-45 mt-1" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </>
  );
}
