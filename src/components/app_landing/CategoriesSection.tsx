"use client";

import Image from 'next/image';
import React from 'react';
import { BsArrowUpRight } from 'react-icons/bs';
import { FaPlay } from 'react-icons/fa';

import { Button } from '../ui/button';

const CategoriesSection = () => {
  return (
    <div className="container mx-auto">
      <div className="grid gap-5 text-white md:h-[530px] md:grid-cols-2 lg:h-[500px]">
        <div className='relative h-[400px] w-full rounded-2xl bg-[url("/bgCollection1.avif")] bg-cover bg-center bg-no-repeat md:h-full bg-red-300'>
          <div className="absolute bottom-5 left-0 w-full space-y-3 px-5">
            <h3 className="text-2xl font-medium">New Release</h3>
            <p className="text-neutral-100">Presenting new trends of 2023</p>
            <div className="items-center gap-5 space-y-5 lg:flex lg:space-y-0">
              <Button variant={"default"} size={"lg"} className="w-full lg:w-auto">2023 LookBook</Button>
              <Button variant={"secondary"} size={"lg"} className="flex w-full items-center gap-1 text-white lg:w-auto">
                <FaPlay /> Watch Trending
              </Button>
            </div>
          </div>
        </div>

        <div>
          <div className="flex h-[650px] flex-col gap-5 md:h-full">
            <div className="h-[63%] w-full rounded-2xl bg-[url('/bgCollection2.avif')] bg-cover bg-bottom bg-no-repeat p-5 bg-gray-300">
              <div className="flex h-full w-full flex-col justify-between rounded-2xl border-2 border-white p-5">
                <div>
                  <Button variant={"default"} size={"lg"} className="flex items-center gap-1 text-white">
                    <FaPlay /> Watch Trending
                  </Button>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-medium">Trending Fashion</h3>
                  <p className="text-neutral-100">New in town - Winter fashion</p>
                </div>
              </div>
            </div>
            <div className="flex h-[35%] w-full flex-col justify-between rounded-2xl bg-primary p-5">
              <div className="flex items-center justify-between">
                <Button variant={"outline"} className="border-2 bg-transparent uppercase text-black">subscribe</Button>

                <div className="flex items-center -space-x-2">
                  {Array.from({ length: 3 }).map((profile, index) => (
                    <div className="h-10 w-10" key={index}>
                      <Image width={300} height={300} src={"/profile"} alt="profile"
                        className="h-full w-full rounded-full object-cover object-center"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p
                  className="basis-[80%] text-2xl font-medium"
                  style={{ lineHeight: '1em' }}
                >
                  Subscribe to newsletter and get news deals and offers
                </p>
                <Button variant={"default"} size={"icon"} className="bg-secondary w-10 h-10 rounded-full">
                  <BsArrowUpRight className="text-2xl" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
