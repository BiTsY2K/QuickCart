"use client";

import React from 'react';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from '../ui/card';


const carouselNavWrapperStyle = `container mx-auto flex justify-evenly`;
const carouselNavButtonStyle = `relative h-14 w-14 translate-y-0 md:absolute md:h-[4.5rem] md:w-[4.5rem] md:-translate-y-full md:-translate-x-full
  mx-7 rounded-full border-2 cursor-pointer bg-transparent text-primary-foreground`;

const carouselIndicatorStyle = "h-4 w-4 md:h-6 md:w-6 rounded-full border-2 cursor-pointer";
const carouselIndicatorActiveStyle = "border-primary-foreground bg-primary-foreground";


interface CarouselIndicatorProps {
  countLength: number,
  currentIndicator: number,
  carouselAPI: CarouselApi,
  indicatorStyle?: string,
  indicatorActiveStyle?: string
}

function CarouselIndicator({
  countLength, carouselAPI, currentIndicator, indicatorStyle, indicatorActiveStyle, ...props
}: CarouselIndicatorProps) {
  return (
    Array.from({ length: countLength }).map((_, index) => (
      <button key={index} onClick={() => carouselAPI?.scrollTo(index)} {...props}
        className={cn(indicatorStyle, (currentIndicator === index + 1) && indicatorActiveStyle
        )}
      />
    ))
  );
}


export default function HeroCarouselSection() {

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
    <Carousel setApi={setApi} className="__carousel relative w-full h-full bg-amber-200">
      <CarouselContent className="__carouselContent w-full h-full !m-0">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={`__carouselItem_${index}`} className="__carouselItem !p-0">
            <div className="__courselItem_wrapper group relative bg-card text-card-foreground border shadow-sm lg:flex items-stretch justify-between h-full gap-0 p-0 rounded-[2px] overflow-hidden">
              <div className="basis-[50%] space-y-10 py-10 pl-5 text-white md:pl-10">
                <p className="text-2xl font-medium">Lorem ipsum dolor sit amet</p>
                <div style={{ lineHeight: '1em' }}
                  className="flex items-center gap-1 text-4xl font-bold md:text-7xl"
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </div>
                <div className="flex items-center gap-7">
                  <Button variant={"default"} size={"lg"}>Shop Now</Button>
                  <Button variant={"outline"} size={"lg"}
                    className='gap-2 border-2 border-white bg-transparent text-white'
                  >
                    <FaPlay /> Watch Trending
                  </Button>
                </div>
              </div>
              <div className="flex basis-[50%] items-end overflow-hidden">
                <Image src={"/"} alt="hero image" width={100} height={100}
                  className="-mb-16 w-full object-bottom"
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Carousel Nagivation */}
      <div className={cn(carouselNavWrapperStyle, "absolute top-[calc(100%-5rem)] md:top-[calc(100%-4rem)] left-1/2 -translate-x-1/2")}>
        {/* Navigation Buttons */}
        <CarouselPrevious className={cn(carouselNavButtonStyle, "left-0  md:left-[calc(100%-10rem)] order-1")} />
        <CarouselNext className={cn(carouselNavButtonStyle, "right-0 md:left-[calc(100%-5rem)] order-3 md:order-2")} />

        {/* Navigation Indicators */}
        <div className="flex items-center justify-between gap-2 rounded-full order-2 md:order-3">
          <CarouselIndicator countLength={count} currentIndicator={current} carouselAPI={api}
            indicatorStyle={carouselIndicatorStyle} indicatorActiveStyle={carouselIndicatorActiveStyle}
          />
        </div>
      </div>
    </Carousel>
  );
}