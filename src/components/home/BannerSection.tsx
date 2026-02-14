"use client";
import { Banner } from '@/lib/api'


interface Props {
    banners: Banner[];
}


export default function BannerSection({ banners  } : Props) {
  return (
    <section>
      {banners.map((banner , index) => (
        <div key={index}>
          <img src={banner.image} alt={banner.title} />
        </div>
      ))}
    </section>
  );
}