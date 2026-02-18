"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/api";


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
                            className="min-w-40 max-w-50 shrink-0 bg-white rounded-2xl p-4 group hover:shadow-md transition"
                        >
                            <div className="w-full aspect-square flex items-center justify-center overflow-hidden rounded mb-3">
                                {p.image ? (
                                    <img src={p.image} alt={p.title} className="w-full h-full object-contain" />
                                ) : (
                                    <div className="text-sm text-gray-500">تصویری موجود نیست</div>
                                )}
                            </div>
                            <h4 className="text-sm font-bold text-gray-700 line-clamp-2 text-right">{p.title}</h4>
                            <p className="mt-2 text-center text-gray-900"> <span className="text-[#F15A22] font-bold">{p.price ?? "-"}</span> تومان</p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
