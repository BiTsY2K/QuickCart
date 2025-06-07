import React from "react";
import Heading from "../shared_components/DecoratorDash";
import { Button } from "../ui/button";
import Image from "next/image";
import { FaStarOfLife } from "react-icons/fa6";

const StyleSection: React.FC<{}> = () => {
  return (
    <div className="container mx-auto py-10">
      <Heading className="mb-5 max-w-3xl" showDash>
        {/* {promoSection.heading} */}
        Style Is A Way To Say Who You Are Without Having To Speak
      </Heading>
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="items-stretch gap-5 md:flex">
          <div className="basis-[40%] space-y-16">
            <Button variant={"default"} size={"lg"}>Shop Now</Button>

            <div className="relative flex w-full items-center justify-center rounded-2xl bg-secondary">
              <Image src={"/promoSection.photo"} alt="photo" width={1000} height={1000}
                className="w-full rounded-2xl"
              />
            </div>
          </div>
          <div className="basis-[60%]">
            <div className="h-5 w-full md:h-[250px]" />

            <div className="space-y-5 rounded-2xl bg-primary p-5 text-white">
              <Button variant={"outline"} size={"lg"} className="border-2 bg-transparent">2023 LogBook</Button>
              <h2 className="text-3xl font-medium">
                {/* {promoSection.promoTitle} */}
                <span className="text-primary-foreground">Get 29% Off This Holiday Season Using The Code: </span>
                <span className="text-secondary">#Festival</span>
              </h2>
            </div>
          </div>
        </div>

        <div className="space-y-10 md:pt-40 lg:pt-0">
          <div className="relative flex h-[350px] w-full items-center justify-center rounded-2xl bg-secondary">
            <Image src={"/woman"} alt="woman" width={1000} height={1000}
              className="absolute bottom-0 mx-auto w-[80%] object-cover md:w-[60%]"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center md:flex">
              <FaStarOfLife className="text-4xl text-primary" />
              <div className="h-px w-24 bg-primary" />
            </div>
            <div className="space-y-5">
              <p className="text-xl font-medium">
                {/* {promoSection.review.quote} */}
                <span className="">Clothes and manners do not make the man, but when he is made, they greatly improve his appearance.</span>
                <span className="block text-lg text-right"> - John Doe {/* {promoSection.review.reviewer} */}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StyleSection;