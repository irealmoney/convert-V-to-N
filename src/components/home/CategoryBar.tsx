import Link from "next/link";
export default function CategoryBar() {
    



    return(
        <div dir="rtl" className="mb-16 mt-4  mx-auto w-full">
            <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-y-16 justify-evenly  mx-auto">
                <Link href={'/'} className="max-sm:flex-1/2 relative w-full">
                    <div className="w-fit mx-auto bg-white rounded-full shadow-lg duration-300 hover:-translate-y-2 hover:shadow-2xl">
                        <img src="/images/home/dog-food.png" className="size-24 max-sm:size-12 rounded-full object-cover" alt="" />
                    </div>
                    <h2 className="absolute w-full py-4 max-sm:text-xs text-center">غذای سگ</h2>
                </Link>

                <Link href={'/'} className="max-sm:flex-1/2 relative w-full">
                    <div className="w-fit mx-auto bg-white rounded-full shadow-lg duration-300 hover:-translate-y-2 hover:shadow-2xl">
                        <img src="/images/home/cat-food.png" className="size-24 max-sm:size-12 rounded-full object-cover" alt="" />
                    </div>
                    <h2 className="absolute w-full py-4 max-sm:text-xs text-center"> غذای گربه </h2>
                </Link>

                <Link href={'/'} className="max-sm:flex-1/2 relative w-full">
                    <div className="w-fit mx-auto bg-white rounded-full shadow-lg duration-300 hover:-translate-y-2 hover:shadow-2xl">
                        <img src="/images/home/Toys-ghalade.png" className="size-24 max-sm:size-12 rounded-full object-cover" alt="" />
                    </div>
                    <h2 className="absolute w-full py-4 max-sm:text-xs text-center"> لوازم جانبی </h2>
                </Link>

                <Link href={'/'} className="max-sm:flex-1/2 relative w-full">
                    <div className="w-fit mx-auto bg-white rounded-full shadow-lg duration-300 hover:-translate-y-2 hover:shadow-2xl">
                        <img src="/images/home/cleaner.png" className="size-24 max-sm:size-12 rounded-full object-cover" alt="" />
                    </div>
                    <h2 className="absolute w-full py-4 max-sm:text-xs text-center"> لوازم بهداشتی </h2>
                </Link>
            </div>
        </div>
    )
};
