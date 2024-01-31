'use client'

import axios from "axios";
import { useEffect, useState } from "react";

type Product = {
  id: string,
  name: string,
  price: number,
  thumbnail: string
}


export const useProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get("http://localhost:3001/products");
        setProducts(res.data);
        setLoading(true)
      };
  
      fetchData();
      setLoading(false)
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }, []);


  return {products, loading};
}




