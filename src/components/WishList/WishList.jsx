import React, { useContext, useState } from "react";
import * as fontAwesome from "react-icons/fa"; //fontawesome icons
import * as bootstrapIcons from "react-icons/bs"; //bootstrap icons
import { Link } from "react-router-dom";
import { WishListContext } from "../../Context/WishListContext/WishListContext";
import RatingStars from "../RatingStars/RatingStars";
import MainLoading from "../MainLoading/MainLoading";
import { CartContext } from "../../Context/CartContext/CartContext";
import { FaHeartCircleMinus } from "react-icons/fa6";
import SaleBadge from "../SaleBadge/SaleBadge";
import Title from "../Title/Title";
import { Helmet } from "react-helmet";

export default function WishList() {
  const [currentId, setCurrentId] = useState(0);

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const { wishList, wishListCount, deleteProductFromWishList } =
    useContext(WishListContext);
  const { addProductToCart } = useContext(CartContext);

  //add product to cart
  async function addToCart(productId) {
    setCurrentId(productId);
    setAddLoading(true);
    await addProductToCart(productId);
    setAddLoading(false);
  }

  async function deleteWishListItem(productId) {
    setCurrentId(productId);
    setDeleteLoading(true);
    await deleteProductFromWishList(productId);
    setDeleteLoading(false);
  }

  if (isLoading) {
    return <MainLoading />;
  }

  if (wishListCount == 0 || wishList?.length === 0) {
    return (
      <>
        <>
          <Helmet>
            <title>WishList</title>
          </Helmet>
          <div className="container py-24 min-h-screen flex items-center justify-center">
            <div className=" justify-center flex items-center">
              <div className="flex flex-col items-center justify-center py-12">
                <bootstrapIcons.BsBox2Heart className="text-[10rem]" />
                <p className="text-2xl font-semibold my-4 text-center">
                  Your wishlist is empty!
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
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>WishList</title>
      </Helmet>
      <>
        <div className="container py-24 min-h-screen">
          <section className="py-10">
            <Title title={"Your Wishlist"} my={"my-8"} mx={"mx-auto"} />
            {wishList?.map((product) => {
              return (
                <div
                  key={product.id}
                  className="max-w-screen-lg p-2 mx-auto my-10 bg-gradient-to-tr from-slate-400 via-slate-200 dark:bg-gradient-to-tr dark:from-slate-950 dark:via-slate-800 shadow-gray-600 shadow rounded-md relative"
                >
                  <SaleBadge top={"-top-3"} product={product} />
                  <div className="grid sm:grid-cols-2 items-center gap-4">
                    <div className="rounded-md to-gray-50 w-full h-full p-4 shrink-0 text-center">
                      <img
                        src={product?.imageCover}
                        alt={product?.title}
                        className="w-56 h-full object-contain inline-block"
                      />
                    </div>
                    <div className="p-2">
                      <h3 className="text-lg font-bold">{product?.title}</h3>
                      <ul className="text-sm  space-y-2 list-disc pl-4 mt-3">
                        <li className="flex justify-between items-center">
                          <RatingStars rating={product?.ratingsAverage} />
                        </li>
                        <li className="dark:text-gray-400 text-gray-600">
                          Category :{" "}
                          <span className="text-black dark:text-white font-semibold">
                            {product?.category.name}{" "}
                          </span>{" "}
                        </li>
                        <li className="dark:text-gray-400 text-gray-600">
                          Subcategory :{" "}
                          <span className="text-black dark:text-white font-semibold">
                            {product?.subcategory[0].name}
                          </span>{" "}
                        </li>
                        <li className="dark:text-gray-400 text-gray-600">
                          Brand :{" "}
                          <span className="text-black dark:text-white font-semibold">
                            {product?.brand.name}
                          </span>{" "}
                        </li>
                        <li className="dark:text-gray-400 text-gray-600">
                          Status :{" "}
                          <span
                            className={`${
                              product?.quantity > 0
                                ? "text-green-500"
                                : "text-red-500"
                            }  font-semibold`}
                          >
                            {product?.quantity > 0
                              ? "In stock now"
                              : "Out of stock"}
                          </span>{" "}
                        </li>
                      </ul>

                      <div className="flex flex-col sm:justify-center md:justify-between mt-6 flex-wrap">
                        <div className="flex gap-3 mb-1 flex-wrap items-center">
                          {product?.priceAfterDiscount > 0 ? (
                            <>
                              <span className="font-bold text-2xl ">
                                {product?.priceAfterDiscount
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                                LE
                              </span>

                              <span className="line-through ">
                                {product?.price
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                                LE
                              </span>
                            </>
                          ) : (
                            <span className=" font-bold text-2xl ">
                              {product?.price
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                              LE
                            </span>
                          )}
                        </div>
                        <div className=" flex gap-2 text-center flex-wrap justify-end">
                          <Link
                            to={`/productDetails/${product?.id}/${product?.category?.name}`}
                            className="block me-3 absolute top-5 left-3"
                          >
                            <button className="group relative inline-flex items-center justify-center p-0.5 text-sm font-medium text-gray-900 rounded-lg group border border-gray-800  hover:bg-blue-700 hover:text-white dark:text-white">
                              <span className="relative px-3 py-2 transition-all ease-in duration-200 dark:bg-gray-300 bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                <fontAwesome.FaEye className="text-xl dark:text-black text-white" />
                              </span>
                              <div className="ease-in duration-300 opacity-0 group-hover:block group-hover:opacity-100 transition-all">
                                <div className="ease-in-out duration-500 -translate-y-4 pointer-events-none transition-all group-hover:-translate-y-14 absolute left-1/2 z-50 flex -translate-x-1/2 flex-col items-center rounded-sm text-center text-sm text-slate-100 before:-top-2">
                                  <div className="rounded-sm bg-black py-1 px-2">
                                    <p className="whitespace-nowrap">
                                      View Details
                                    </p>
                                  </div>
                                  <div className="h-0 w-fit border-l-8 border-r-8 border-t-8 border-transparent border-t-black" />
                                </div>
                              </div>
                            </button>
                          </Link>
                          <button
                            disabled={
                              currentId === product?.id && deleteLoading
                            }
                            onClick={() => deleteWishListItem(product?.id)}
                            className="disabled:cursor-not-allowed bg-red-950 flex items-center text-red-200 border border-red-400 border-b-4 font-medium overflow-hidden relative px-2 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
                          >
                            {currentId === product?.id && deleteLoading ? (
                              <fontAwesome.FaSpinner className="animate-spin m-2" />
                            ) : (
                              <>
                                <span className="bg-red-400 shadow-red-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                                <FaHeartCircleMinus className="me-2 text-xl" />
                                Remove
                              </>
                            )}
                          </button>
                          <button
                            disabled={currentId === product?.id && addLoading}
                            onClick={() =>
                              addToCart(product?.id).then(() =>
                                deleteWishListItem(product?.id)
                              )
                            }
                            className=" disabled:cursor-not-allowed bg-blue-950 flex items-center text-blue-200 border border-blue-400 border-b-4 font-medium overflow-hidden relative px-2 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
                          >
                            {currentId === product?.id && addLoading ? (
                              <fontAwesome.FaSpinner className="animate-spin m-2" />
                            ) : (
                              <>
                                <span className="bg-blue-400 shadow-blue-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                                <fontAwesome.FaCartPlus className="me-2 text-xl" />
                                Add to cart
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        </div>
      </>
    </>
  );
}
