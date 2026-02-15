"use client";
import { Banner } from '@/lib/api'



import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface Props {
    banners: Banner[];
}


export default function BannerSection({ banners  } : Props) {


  return (
    <section>

<Carousel className="w-full sm:max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <div>
                <div className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

      {banners.map((banner , index) => (
        <div key={index}>
          <img src={`${'http://localhost:8000/'}${banner.image}`} alt={banner.title} />
        </div>
      ))}
    </section>
  );
}