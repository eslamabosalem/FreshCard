import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useAllProducts() {
  const allProducts = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const data1 = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/?page=1`
      );
      const data2 = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/?page=2`
      );
      return [...data1.data.data, ...data2.data.data];
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  return allProducts;
}
