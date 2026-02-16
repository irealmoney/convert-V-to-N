import Image from "next/image";
import {getProducts , getBanners} from './../lib/api'
import BannerSection from './../components/home/BannerSection'
import ProductSection from './../components/home/ProductsSection'
import CategoryBar from "@/components/home/CategoryBar";


export default async function Home() {


  const [banners, products] = await Promise.all([
    getBanners(),
    getProducts(),
  ]);


  return (
      <main className="flex min-h-screen w-full max-w-7xl mx-auto flex-col items-center justify-between px-8 py-8">
          <BannerSection banners={banners} />
          <CategoryBar />



          <ProductSection products={products} />

      </main>
  );
}
