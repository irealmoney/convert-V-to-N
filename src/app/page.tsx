import Image from "next/image";
import {getProducts , getBanners} from './../lib/api'
import BannerSection from './../components/home/BannerSection'
import ProductSection from './../components/home/ProductsSection'


export default async function Home() {


  const [banners, products] = await Promise.all([
    getBanners(),
    getProducts(),
  ]);


  return (
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 ">
          <BannerSection banners={banners} />
          <ProductSection products={products} />

      </main>
  );
}
