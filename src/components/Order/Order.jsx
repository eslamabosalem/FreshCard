import React, { useContext, useEffect, useState } from "react";
import * as fontAwesome from "react-icons/fa"; //fontawesome icons
import { MdOutlineShareLocation } from "react-icons/md";
import { OrdersContext } from "../../Context/OrdersContext/OrdersContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import MainLoading from "../MainLoading/MainLoading";
import RatingStars from "../RatingStars/RatingStars";
import { Helmet } from "react-helmet";

export default function Order() {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const { orders, isLoading } = useContext(OrdersContext);

  const [currentOrder, setCurrentOrder] = useState(
    orders?.find((order) => order.id == orderId)
  );

  useEffect(() => {
    setCurrentOrder(orders?.find((order) => order.id == orderId));
  }, [orders]);

  useEffect(() => {
    window.scrollTo(0, 0);
    orders?.length == 0 || !orders?.some((order) => order?.id !== orderId)
      ? navigate("/allOrders")
      : null;
  }, [orders]);

  if (isLoading) {
    return <MainLoading />;
  }

  return (
    <>
      <Helmet>
        <title>{currentOrder?.id + " Order"}</title>
      </Helmet>
      <>
        <div className="container py-24 min-h-screen">
          <div className="grid mt-11 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-5 gap-3">
            <div className="card hover:brightness-90 transition-all group bg-gradient-to-tr from-slate-400 via-slate-200 to-slate-200 dark:bg-gradient-to-tr dark:from-slate-950 dark:via-slate-800 dark:to-slate-950  shadow-2xl rounded-lg overflow-hidden relative">
              <div className="px-8 py-10">
                <fontAwesome.FaInfoCircle className="bg-blue-500 w-10 h-10 rounded-full mb-4 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-blue-900 transition-all" />
                <div className=" font-bold text-xl">Order info</div>
                <div className="text-gray-400 mt-8">
                  <ul className="text-sm  space-y-2 mt-3">
                    <li className="dark:text-gray-400 text-gray-800">
                      Order Date :&nbsp;
                      <span className="text-black dark:text-white font-semibold">
                        {currentOrder?.updatedAt.split("T")[0]}
                      </span>
                    </li>
                    <li className="dark:text-gray-400 text-gray-800">
                      Payment Method :&nbsp;
                      <span className="text-black dark:text-white font-semibold">
                        {currentOrder?.paymentMethodType}
                      </span>
                    </li>

                    <li className="dark:text-gray-400 text-gray-800">
                      Number Of Items :&nbsp;
                      <span className="text-black dark:text-white font-semibold">
                        {currentOrder?.cartItems.length > 1
                          ? `${currentOrder?.cartItems.length} items`
                          : `${currentOrder?.cartItems.length} item`}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="h-2 w-full bg-gradient-to-l via-blue-500 group-hover:blur-xl blur-2xl m-auto rounded transition-all absolute bottom-0" />
              <div className="h-0.5 group-hover:w-full bg-gradient-to-l  via-blue-500 group-hover:via-blue-500 w-[70%] m-auto rounded transition-all" />
            </div>

            <div className="card hover:brightness-90 transition-all group bg-gradient-to-tr from-slate-400 via-slate-200 to-slate-200 dark:bg-gradient-to-tr dark:from-slate-950 dark:via-slate-800 dark:to-slate-950  shadow-2xl rounded-lg overflow-hidden relative">
              <div className="px-8 py-10">
                <fontAwesome.FaUserCircle className="bg-blue-500 w-10 h-10 rounded-full mb-4 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-blue-900 transition-all" />
                <div className=" font-bold text-xl">Customer</div>
                <div className="text-gray-400 mt-8">
                  <ul className="text-sm  space-y-2 mt-3">
                    <li className="dark:text-gray-400 text-gray-800">
                      Name :&nbsp;
                      <span className="text-black dark:text-white font-semibold">
                        {currentOrder?.user?.name}
                      </span>
                    </li>
                    <li className="dark:text-gray-400 text-gray-800">
                      Email :&nbsp;
                      <span className="text-black dark:text-white font-semibold">
                        {currentOrder?.user?.email}
                      </span>
                    </li>
                    <li className="dark:text-gray-400 text-gray-800">
                      Phone Number :&nbsp;
                      <span className="text-black dark:text-white font-semibold">
                        {currentOrder?.user?.phone}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="h-2 w-full bg-gradient-to-l via-blue-500 group-hover:blur-xl blur-2xl m-auto rounded transition-all absolute bottom-0" />
              <div className="h-0.5 group-hover:w-full bg-gradient-to-l  via-blue-500 group-hover:via-blue-500 w-[70%] m-auto rounded transition-all" />
            </div>

            <div className="card hover:brightness-90 sm:col-span-2 lg:col-span-1 transition-all group bg-gradient-to-tr from-slate-400 via-slate-200 to-slate-200 dark:bg-gradient-to-tr dark:from-slate-950 dark:via-slate-800 dark:to-slate-950  shadow-2xl rounded-lg overflow-hidden relative">
              <div className="px-8 py-10">
                <MdOutlineShareLocation className="bg-blue-500 w-10 h-10 rounded-full mb-4 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-blue-900 transition-all" />
                <div className=" font-bold text-xl">Address</div>
                <div className="text-gray-400 mt-8">
                  <ul className="text-sm  space-y-2 mt-3">
                    <li className="dark:text-gray-400 text-gray-800">
                      Shipping Address :&nbsp;
                      <span className="text-black dark:text-white font-semibold">
                        {currentOrder?.shippingAddress?.city}
                      </span>
                    </li>
                    <li className="dark:text-gray-400 text-gray-800">
                      Status :&nbsp;
                      <span className="text-black dark:text-white font-semibold">
                        {currentOrder?.isPaid == false &&
                        currentOrder?.isDelivered == false
                          ? "Placed"
                          : currentOrder?.isPaid == true &&
                            currentOrder?.isDelivered == false
                          ? "Shipped"
                          : "Arrived"}
                      </span>
                    </li>
                    <li className="dark:text-gray-400 text-gray-800">
                      Payment Status :&nbsp;
                      <span className="text-black dark:text-white font-semibold">
                        {currentOrder?.isPaid == false
                          ? "Not Paid Yet"
                          : "Paid"}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="h-2 w-full bg-gradient-to-l via-blue-500 group-hover:blur-xl blur-2xl m-auto rounded transition-all absolute bottom-0" />
              <div className="h-0.5 group-hover:w-full bg-gradient-to-l  via-blue-500 group-hover:via-blue-500 w-[70%] m-auto rounded transition-all" />
            </div>
          </div>

          {/* products */}
          <section className="pb-24 mt-10 relative">
            <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
              <div className="flex items-start flex-col gap-6 xl:flex-row ">
                <div className="w-full max-w-sm md:max-w-3xl max-xl:mx-auto">
                  <div className="grid grid-cols-1 gap-6">
                    {currentOrder?.cartItems?.map((product) => {
                      return (
                        <Link
                          to={`/productDetails/${product?.product?.id}/${product?.product?.category?.name}`}
                          key={product?._id}
                        >
                          <div className="rounded-3xl hover:scale-105 hover:shadow-2xl dark:hover:shadow-inner dark:hover:shadow-blue-600 p-6 dark:bg-gray-800 bg-white flex flex-col md:flex-row md:items-center gap-5 transition-all duration-500">
                            <div className="img-box ">
                              <img
                                src={product?.product?.imageCover}
                                alt={product?.product?.title}
                                className="w-full md:max-w-[122px] rounded-lg"
                              />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3 md:gap-8">
                              <div>
                                <h2 className="font-medium text-xl leading-8 mb-3">
                                  {product?.product?.title}
                                </h2>
                                <p className="font-normal text-lg leading-8 text-gray-500 ">
                                  Quantity: {product?.count}
                                </p>
                              </div>
                              <div className="flex items-center gap-4 lg:gap-10">
                                <RatingStars
                                  rating={product?.product?.ratingsAverage}
                                />
                                <h6 className="font-medium text-xl leading-8 dark:text-blue-300 text-blue-600">
                                  {product?.price
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                                  LE
                                </h6>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="w-full max-w-sm md:max-w-3xl xl:max-w-sm flex items-start flex-col max-xl:mx-auto sticky top-24">
                  <div className="p-6 dark:bg-gray-800 bg-white rounded-3xl w-full group transition-all duration-500  ">
                    <h2 className="font-manrope font-bold text-3xl leading-10 pb-2 border-b border-gray-200 ">
                      Order Summary
                    </h2>
                    <div className="data py-4 border-b border-gray-200">
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <p className="font-normal text-lg leading-8 dark:text-gray-300 text-gray-700">
                          Tax
                        </p>
                        <p className="font-medium text-lg leading-8">
                          {currentOrder?.taxPrice}
                        </p>
                      </div>
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <p className="font-normal text-lg leading-8 dark:text-gray-300 text-gray-700">
                          Shipping
                        </p>
                        <p className="font-medium text-lg leading-8">
                          {currentOrder?.shippingPrice}
                        </p>
                      </div>
                      <div className="flex items-center justify-between gap-4 ">
                        <p className="font-normal text-lg leading-8 dark:text-gray-300 text-gray-700 ">
                          Subtotal
                        </p>
                        <p className="font-medium text-lg leading-8">
                          {currentOrder?.totalOrderPrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                          LE
                        </p>
                      </div>
                    </div>
                    <div className="total flex items-center justify-between pt-6">
                      <p className="font-normal text-xl leading-8">Total</p>
                      <h5 className="font-manrope font-bold text-2xl leading-9 dark:text-blue-400 text-blue-600 ">
                        {currentOrder?.totalOrderPrice
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        LE
                      </h5>
                    </div>
                  </div>
                  <Link
                    onClick={() => scrollTo(0, 0)}
                    to={`/allorders`}
                    className="block w-full mt-2 text-center group/button relative items-center justify-center overflow-hidden rounded-md bg-blue-700 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-blue-600/50 border border-white/20"
                  >
                    <span className="text-lg">Back To Order List</span>
                    <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                      <div className="relative h-full w-10 bg-white/30" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    </>
  );
}
