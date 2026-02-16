"use client";
import { Banner } from '@/lib/api'


import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useState } from 'react';

interface Props {
    banners: Banner[];
}


export default function BannerSection({ banners  } : Props) {

  const [api , setapi] = useState<CarouselApi>();
  const [current , setcurrent] = useState(0);

  const handleChange = (newApi : CarouselApi) => {
    setapi(newApi);

    if(newApi) {
      setcurrent(newApi.selectedScrollSnap());

      newApi.on("select" , () => {       
         setcurrent(newApi.selectedScrollSnap());
      });
    }
  }

  console.log("Current index:", current, "Clicked index:", api);


  return (
    <section>
      <Carousel setApi={handleChange} className="w-full">
        <CarouselContent>
          {banners.map((banner , index) => (
            <CarouselItem key={index} >
                <div key={index} >
                  <img className='rounded-4xl' src={`${'http://localhost:8000/'}${banner.image}`} alt={banner.title} />
                </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex justify-center gap-2">
        {banners.map((slide, index) => (
          
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`w-fit my-2 ${ current === index ? "bg-[#F15A22] text-white p-1 rounded-full" : "border border-gray-300 bg-zinc-200  p-1 rounded-full"}`}
          >
          </button>
        ))}
      </div>

    </section>
  );
}