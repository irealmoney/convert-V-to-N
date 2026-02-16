import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import useProducts from '../../hooks/useProductsF'
import Slider from "react-slick";

export default function MySwiper() {

    const [page, setPage] = useState(1);
    const [queryParams , setQueryParams] = useState();
    const { products, loading, error, pagination } = useProducts(page, queryParams);
    const sliderRef = useRef(null);
  
    const settings = {
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 2,
        autoplaySpeed: 2000,
        rtl: true ,
        arrows : false
    };
  
    return (
        <div dir="rtl" className="mx-6 w-9/12">

            <Slider {...settings}>
                
                {products?.map((product) => (     
                    <div key={`${product.ID}-${product.title}`} className="px-2 py-2">
                        <Link draggable={false} key={`${product.ID}-${product.title}`}  className="flex flex-col bg-white justify-between group px-5 py-5 rounded-2xl transition duration-300  hover:bg-gray-50  text-right">
                                    {
                                    product?.mainImage?.length > 0 ? (
                                        

                                        <div className="w-full aspect-square  flex items-center justify-center overflow-hidden rounded">
                                            <img
                                            className="w-full h-full object-contain"
                                            src={"http://localhost:8000/public" + product.mainImage?.[0]?.['480']}
                                            alt={` ${product.title}`}
                                            />
                                        </div>
                                        
                                    ) : (
                                        <p>تصویری موجود نیست</p>
                                    )
                                    }
                        <h2 dir="ltr" style={{ direction: 'rtl', textAlign: 'right' }} className="mt-4 line-clamp-2 text-sm md:text-xs lg:text-sm sm:text-[8px] text-right font-bold text-gray-700">{product.title}</h2>
                        <p dir="rtl" className="mt-2 text-sm text-center text-gray-900">  <span className='text-[#F15A22] font-bold'>{product.price}</span> تومان</p>

                        </Link>
                    </div>
                ))}
            </Slider>


            <div dir="rtl" className="bg-[#F15A22] rounded-2xl flex flex-row items-center justify-between">
                <div className="pr-6">
                    <img
                        className="w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg"
                        src="./../src/assets/images/sale.png"
                        alt="تخفیف"
                    />
                </div>

                <MySwiper />
            </div>
        </div>
    );
  };
