import React, { Fragment, useContext, useState } from "react";
import * as fontAwesome from "react-icons/fa"; //fontawesome icons
import * as bootstrapIcons from "react-icons/bs"; //bootstrap icons
import { GiTakeMyMoney } from "react-icons/gi";
import { Link } from "react-router-dom";
import { OrdersContext } from "../../Context/OrdersContext/OrdersContext";
import MainLoading from "../MainLoading/MainLoading";
import Title from "../Title/Title";
import { Helmet } from "react-helmet";
import { AnimatePresence, motion } from "framer-motion";

export default function Orders() {
  const [orderDetails, setOrderDetails] = useState({});
  const { orders, isLoading, isFetching } = useContext(OrdersContext);

  if (isLoading || isFetching) {
    return <MainLoading />;
  }

  if (orders?.length === 0) {
    return (
      <>
        <Helmet>
          <title>Orders List</title>
        </Helmet>

        <div className="container py-24 min-h-screen flex items-center justify-center">
          <div className=" justify-center flex items-center">
            <div className="flex flex-col items-center justify-center py-12">
              <fontAwesome.FaDropbox className="text-[10rem]" />
              <p className="text-2xl font-semibold my-4 text-center">
                You have not ordered any product before!
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
      <Helmet>
        <title>Orders List</title>
      </Helmet>

      <div className="container py-24 min-h-screen">
        <section className=" py-8 antialiased  md:py-16">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <div className="mx-auto max-w-5xl">
              <Title title={"Your Orders"} mx={"mx-auto"} />

              <div className="mt-6 flow-root sm:mt-8">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {orders?.map((order) => {
                    return (
                      <Fragment key={order?.id}>
                        {/* order status */}
                        <AnimatePresence>
                          {orderDetails[order?.id] && (
                            <motion.main
                              initial={{ y: "-100%" }}
                              animate={{ y: 0 }}
                              exit={{ y: "100%" }}
                              transition={{
                                duration: 0.3,
                                ease: "easeInOut",
                                type: "spring",
                                mass: 0.7,
                                damping: 10,
                              }}
                              id="track"
                              onClick={(e) =>
                                e.target.id == "track" && setOrderDetails({})
                              }
                              className="fixed inset-0 lg:p-40 flex bg-black/50 justify-center items-center z-50"
                            >
                              <div className="w-full relative bg-black py-52 text-white">
                                <fontAwesome.FaTimes
                                  onClick={() => setOrderDetails({})}
                                  className="absolute top-5 left-5 text-3xl cursor-pointer"
                                />
                                <div className="flex justify-center">
                                  <div className="w-1/3">
                                    <div className="relative mb-2">
                                      <div className="w-10 h-10 mx-auto bg-blue-700 rounded-full text-lg flex items-center">
                                        <span className="text-center flex items-center justify-center w-full">
                                          <bootstrapIcons.BsCartCheckFill className="text-2xl" />
                                        </span>
                                      </div>
                                    </div>
                                    <div className="text-xs text-center md:text-base">
                                      Order Placed
                                    </div>
                                  </div>
                                  <div className="w-1/3">
                                    <div className="relative mb-2">
                                      <div
                                        className="absolute flex align-center items-center align-middle content-center"
                                        style={{
                                          width: "calc(100% - 2.5rem - 1rem)",
                                          top: "50%",
                                          transform: "translate(-50%, -50%)",
                                        }}
                                      >
                                        <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                                          <div
                                            className="w-0 bg-blue-700 py-1 rounded"
                                            style={
                                              order?.isPaid
                                                ? { width: "100%" }
                                                : { width: "50%" }
                                            }
                                          />
                                        </div>
                                      </div>
                                      <div
                                        className={`w-10 h-10 mx-auto ${
                                          order?.isPaid
                                            ? "bg-blue-700 text-white"
                                            : "bg-white text-gray-800"
                                        } rounded-full text-lg  flex items-center`}
                                      >
                                        <span className="text-center flex items-center justify-center w-full">
                                          <GiTakeMyMoney className="text-3xl " />
                                        </span>
                                      </div>
                                    </div>
                                    <div className="text-xs text-center md:text-base">
                                      Order Paid
                                    </div>
                                  </div>
                                  <div className="w-1/3">
                                    <div className="relative mb-2">
                                      <div
                                        className="absolute flex align-center items-center align-middle content-center"
                                        style={{
                                          width: "calc(100% - 2.5rem - 1rem)",
                                          top: "50%",
                                          transform: "translate(-50%, -50%)",
                                        }}
                                      >
                                        <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                                          <div
                                            className="w-0 bg-blue-700 py-1 rounded"
                                            style={
                                              order?.isPaid &&
                                              order?.isDelivered
                                                ? { width: "100%" }
                                                : !order?.isPaid &&
                                                  !order?.isDelivered
                                                ? { width: "0%" }
                                                : { width: "50%" }
                                            }
                                          />
                                        </div>
                                      </div>
                                      <div
                                        className={`w-10 h-10 mx-auto ${
                                          order?.isDelivered
                                            ? "bg-blue-700 text-white"
                                            : "bg-white text-gray-700"
                                        } rounded-full text-lg flex items-center`}
                                      >
                                        <span className="text-center flex items-center justify-center  w-full">
                                          <fontAwesome.FaHome className="text-3xl" />
                                        </span>
                                      </div>
                                    </div>
                                    <div className="text-xs text-center md:text-base">
                                      Order Arrived
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.main>
                          )}
                        </AnimatePresence>
                        {/* order details */}
                        <div className="flex flex-wrap items-center gap-y-4 py-6">
                          <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                              Order ID:
                            </dt>
                            <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                              <span>{order?.id}</span>
                            </dd>
                          </dl>
                          <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                              Date:
                            </dt>
                            <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                              {order?.updatedAt.split("T")[0]}
                            </dd>
                          </dl>
                          <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                              Items Count
                            </dt>
                            <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                              {order?.cartItems.length}
                            </dd>
                          </dl>
                          <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                              Price:
                            </dt>
                            <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                              {order?.totalOrderPrice
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                              LE
                            </dd>
                          </dl>
                          <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                              paymentMethod:
                            </dt>
                            <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                              {order?.paymentMethodType == "cash" ? (
                                <GiTakeMyMoney className="me-2 text-3xl" />
                              ) : (
                                <fontAwesome.FaMoneyCheck className="me-2 " />
                              )}
                              {order?.paymentMethodType}
                            </dd>
                          </dl>
                          <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                            <button
                              onClick={() =>
                                setOrderDetails((prevOrderDetails) => ({
                                  ...prevOrderDetails,
                                  [order?.id]: true,
                                }))
                              }
                              className="bg-yellow-950 flex justify-center items-center text-yellow-200 border border-yellow-400 border-b-4 font-medium overflow-hidden relative px-2 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
                            >
                              <span className="bg-yellow-400 shadow-yellow-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                              <fontAwesome.FaInfoCircle className="me-2" />
                              status
                            </button>
                            <Link
                              to={`/order/${order?.id}`}
                              className="bg-green-950 flex justify-center items-center text-green-200 border border-green-400 border-b-4 font-medium overflow-hidden relative px-2 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
                            >
                              <span className="bg-green-400 shadow-green-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                              <fontAwesome.FaEye className="me-2" />
                              Order Details
                            </Link>
                          </div>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
