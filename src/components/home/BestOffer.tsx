"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/api";
import ProductCard from "../ui/ProductCard";


interface Props {
  products: Product[];
}

export default function BestOffer({ products }: Props) {

    const [loading, setLoading] = useState(false);



    return (
        <div dir="rtl" className="mx-6 w-full">
            <div className="flex items-center gap-6 mb-4">
                <div className="bg-[#F15A22] rounded-2xl p-4 flex items-center">
                    <img src="/images/home/sale.png" alt="تخفیف" className="w-36 h-auto" />
                </div>
                <h3 className="text-lg font-bold">پیشنهاد ویژه</h3>
            </div>

            {loading ? (
                <p>در حال بارگذاری...</p>
            ) : (
                <div className="flex gap-4 overflow-x-auto py-2">
                    {products?.map((p , index) => (
                        <Link
                            key={index}
                            href={`/products/${p.ID}`}
                            draggable={false}
                            className="min-w-56 max-w-50 shrink-0 bg-white rounded-2xl"
                        >
                            <ProductCard product={p} />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
