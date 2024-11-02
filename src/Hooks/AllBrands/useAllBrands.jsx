import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useAllBrands() {
  async function getBrands() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/brands`
      );
      return data;
    } catch (error) {
      return error;
    }
  }

  const allBrands = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
    staleTime: 1000 * 60 * 60, // 1 hour
    select: (data) => data.data,
  });

  return allBrands;
}
