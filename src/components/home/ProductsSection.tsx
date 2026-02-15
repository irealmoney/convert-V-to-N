"use client";


import { Product } from "@/lib/api";

interface Props {
  products: Product[];
}

export default function ProductSection({ products }: Props) {

  console.log(products);
  return (
    <section>
      {products?.map((product) => (
        <div key={product._id}>
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          <p>{product.price.toLocaleString()} تومان</p>
        </div>
      ))}
    </section>
  );
}