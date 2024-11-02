import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useAllCategories() {
  async function getCategories() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories`
      );
      return data;
    } catch (error) {
      return error;
    }
  }

  const allCategories = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 60, // 1 hour
    select: (data) => data.data,
  });

  return allCategories;
}
