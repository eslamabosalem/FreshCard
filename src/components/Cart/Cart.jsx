import React, { useContext, useEffect, useState } from "react";
import * as fontAwesome from "react-icons/fa"; //fontawesome icons
import { CartContext } from "../../Context/CartContext/CartContext";
import MainLoading from "../MainLoading/MainLoading";
import { Link } from "react-router-dom";
import CartItem from "../CartItem/CartItem";
import { FaShopify } from "react-icons/fa6";
import Title from "../Title/Title";
import { Helmet } from "react-helmet";

export default function Cart() {
  const { productsCount, clearCart, setCart, cart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <MainLoading />;
  }

  if (productsCount == 0 || productsCount == null) {
    return (
      <>
        <Helmet>
          <title>Cart</title>
        </Helmet>
        <div className="container py-24 min-h-screen flex items-center justify-center">
          <div className=" justify-center flex items-center">
            <div className="flex flex-col items-center justify-center py-12">
              <FaShopify className="text-[10rem]" />
              <p className="text-2xl font-semibold my-4 text-center">
                Your shopping cart is empty!
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-center my-2">
                Browse our categories and discover our best deals!
              </p>
              <Link
                to={"/"}
                className="group mt-2 relative overflow-hidden bg-blue-600 focus:ring-4 focus:ring-blue-300 inline-flex items-center px-7 py-2.5 rounded-lg text-white justify-center"
              >
                <span className="z-40 flex items-center">
                  <fontAwesome.FaCartArrowDown className="me-2 text-xl" />
                  {"Let's go shopping"}
                </span>
                <div className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 group-hover:translate-x-[50%] z-20 duration-1000"></div>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container py-24 min-h-screen">
        <div className="font-[sans-serif]  h-full pt-5">
          <div className="max-w-7xl max-lg:max-w-3xl mx-auto ">
            <div className="flex flex-wrap">
              <Title title={"Shopping Cart"} />

              <button
                onClick={clearCart}
                className=" block mt-2 sm:mt-0 w-full sm:w-auto font-semibold ml-auto group relative overflow-hidden bg-red-600 focus:ring-4 focus:ring-red-300  items-center px-7 py-2.5 rounded-lg text-white justify-center"
              >
                <span className=" flex items-center justify-center">
                  <fontAwesome.FaTrash className="me-2" />
                  Clear Cart
                </span>
                <div className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 group-hover:translate-x-[50%] z-20 duration-1000"></div>
              </button>
            </div>
            <div className="grid xl:grid-cols-3 gap-6 relative mt-4">
              <div className="xl:col-span-2 space-y-6">
                {cart?.data?.products?.map((product, index) => {
                  return (
                    <CartItem
                      product={product}
                      key={index}
                      cart={cart}
                      setCart={setCart}
                    />
                  );
                })}
              </div>

              <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-max  p-4 sticky top-24">
                <h3 className="text-lg font-bold dark:text-slate-300 text-gray-800">
                  Order Summary
                </h3>
                <ul className="text-gray-500 text-sm space-y-3 mt-3">
                  <li className="flex flex-wrap gap-4">
                    Subtotal{" "}
                    <span className="ml-auto font-bold">
                      {cart?.data?.totalCartPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                      LE
                    </span>
                  </li>
                  <li className="flex flex-wrap gap-4">
                    Shipping <span className="ml-auto font-bold">Free</span>
                  </li>
                  <li className="flex flex-wrap gap-4">
                    Tax <span className="ml-auto font-bold">0</span>
                  </li>
                  <li className="flex flex-wrap gap-4 font-bold">
                    Total{" "}
                    <span className="ml-auto">
                      {cart?.data?.totalCartPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                      LE
                    </span>
                  </li>
                </ul>
                <Link
                  onClick={() => window.scrollTo(0, 0)}
                  to={`/checkout/${cart?.data?._id}`}
                  className="block text-center group/button relative items-center mt-2 justify-center overflow-hidden rounded-md bg-blue-700 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-blue-600/50 border border-white/20"
                >
                  <span className="text-lg">Check out</span>
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                    <div className="relative h-full w-10 bg-white/30" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
