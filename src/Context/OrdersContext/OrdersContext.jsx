import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext/UserContext";

export const OrdersContext = createContext();

export default function OrdersContextProvider({ children }) {
  const { userLogin } = useContext(UserContext);

  let id = {};

  localStorage.getItem("userToken")
    ? ({ id } = jwtDecode(localStorage.getItem("userToken")))
    : null;

  function getUserOrders() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
    );
  }

  const {
    data: orders,
    error,
    isError,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["orders", id],
    queryFn: getUserOrders,
    select: (data) => data.data,
    staleTime: 1000 * 60 * 60, // 1 hour
    enabled: userLogin ? true : false,
  });

  const [ordersCount, setOrdersCount] = useState(orders?.length);

  useEffect(() => {
    setOrdersCount(orders?.length);
  }, [orders]);

  return (
    <OrdersContext.Provider
      value={{
        orders,
        isLoading,
        error,
        isError,
        refetch,
        isFetching,
        ordersCount,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}
