"use client";

import Header from "@/app/(main)/_components/Header";
import ProductCard from "@/app/(main)/_components/ProductCard";
import axios from "axios";
import { useEffect, useState } from "react";

// import { products } from "@/data/product.json";

type ProductItem = {
  id: number,
  name: string,
  price: number,
  thumbnail: string
}

export default function Home() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // console.log("get Prodcut from api");
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/products");

        // console.log("products =>", res);
        setProducts(res.data);
        setLoading(true)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if(!loading) return <div>Not data</div>
  
  return (
    <div className="w-full">
      <Header />

      <div className="mt-20 space-y-5">
        <h3 className="text-3xl font-semibold">Product</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
          {products.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              thumbnail={item.thumbnail}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
