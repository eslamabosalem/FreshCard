import React, { useContext } from "react";
import * as fontAwesome from "react-icons/fa"; //fontawesome icons
import * as bootstrapIcons from "react-icons/bs"; //bootstrap icons
import { Link } from "react-router-dom";
import RatingStars from "../RatingStars/RatingStars";
import QuantityInput from "../CartItem/QuantityInput";
import { CartContext } from "../../Context/CartContext/CartContext";
import { WishListContext } from "../../Context/WishListContext/WishListContext";
import AddToWishListCheckBox from "../AddToWishListCheckBox/AddToWishListCheckBox";
import SaleBadge from "../SaleBadge/SaleBadge";
import { UserContext } from "../../Context/UserContext/UserContext";

export default function ProductCard({
  product,
  loading,
  currentId,
  deleteItem,
  addProduct,
  setOpenModal,
  setModalPlace,
}) {
  const { cart } = useContext(CartContext);
  const { deleteProductFromWishList, wishListIds } =
    useContext(WishListContext);
  const { userLogin } = useContext(UserContext);

  return (
    <>
      <div>
        <div className="relative p-2">
          <SaleBadge top={"-top-1"} product={product} />

          <div className="relative overflow-hidden hover:-translate-y-2 group/card bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700 transition-all duration-700">
            <div className="overflow-hidden relative rounded-t-lg">
              <img
                className="scale-110 group-hover/card:scale-100 brightness-100 group-hover/card:brightness-50 grayscale-0 group-hover/card:grayscale-[55%] transition-all duration-700 filter rounded-t-lg"
                src={product?.imageCover}
                alt={product?.title}
              />
            </div>
            <div className="flex flex-col items-center text-blue-300 justify-center group-hover/card:brightness-50 group-hover/card:text-white transition-all duration-700 group-hover/card:bg-white bg-black/90 p-1 gap-1">
              <h3 className="tracking-tight font-bold ">
                {product?.title
                  .replace("-", " ")
                  .split(" ")
                  .slice(0, 2)
                  .join(" ")}
              </h3>
              {product?.priceAfterDiscount > 0 ? (
                <div className="flex items-center gap-2 border-t border-gray-600/50">
                  <span className="font-bold text-lg text-white">
                    {product?.priceAfterDiscount
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    LE
                  </span>

                  <span className="line-through text-white">
                    {product?.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    LE
                  </span>
                </div>
              ) : (
                <span className=" font-bold text-white border-t border-gray-600/50">
                  {product?.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  LE
                </span>
              )}
            </div>

            <AddToWishListCheckBox
              product={product}
              setModalPlace={setModalPlace}
              setOpenModal={setOpenModal}
            />
            <div className="flex w-full flex-col absolute z-30 group-hover/card:bottom-0 group-hover/card:opacity-100  -bottom-[17rem] transition-all duration-500 bg-black/80">
              <div className="p-2 flex flex-col  gap-2">
                <div className="flex justify-between items-center">
                  <h3 className="tracking-tight group-hover/card:translate-x-0 translate-x-[500%] transition-all duration-700 delay-150 font-bold text-blue-300">
                    {product?.title
                      .replace("-", " ")
                      .split(" ")
                      .slice(0, 2)
                      .join(" ")}
                  </h3>
                  <Link
                    to={`/productDetails/${product?.id}/${product?.category?.name}`}
                    className="block group-hover/card:translate-x-0 -translate-x-[600%] transition-all duration-700 delay-150"
                  >
                    <button
                      onClick={() => window.scrollTo(0, 0)}
                      className="group relative inline-flex items-center justify-center p-0.5 text-sm font-medium text-gray-900 rounded-lg group border border-gray-800  hover:bg-blue-700 hover:text-white dark:text-white"
                    >
                      <span className="relative px-3 py-2 transition-all ease-in duration-200 bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        <fontAwesome.FaEye className="text-xl text-white" />
                      </span>
                      <div className="ease-in duration-300 opacity-0 group-hover:block group-hover:opacity-100 transition-all">
                        <div className="ease-in-out duration-500 group-hover:-translate-y-10 -translate-y-4 pointer-events-none transition-all group-hover:-translate-x-32 absolute left-1/2 z-50 flex -translate-x-1/2 items-center rounded-sm text-center text-sm text-slate-300 before:-top-2">
                          <div className="rounded-sm bg-gray-700 py-1 px-2">
                            <p className="whitespace-nowrap text-white">
                              View Details
                            </p>
                          </div>
                          <div className="h-0 w-fit border-l-[20px] border-l-gray-700 border-r-8 border-t-8 border-transparent" />
                        </div>
                      </div>
                    </button>
                  </Link>
                </div>
                <h5 className="line-clamp-1 group-hover/card:translate-x-0 translate-x-[110%] transition-all duration-700 delay-150  text-white">
                  {product?.description}
                </h5>
                <div className="group-hover/card:translate-x-0 -translate-x-[110%] transition-all duration-700 delay-150">
                  <RatingStars rating={product?.ratingsAverage} />
                </div>

                <div className="flex items-center gap-2">
                  {product?.priceAfterDiscount > 0 ? (
                    <div className="group-hover/card:translate-x-0 translate-x-[210%] transition-all duration-700 delay-150 flex gap-2 items-center">
                      <span className="font-bold text-lg text-white">
                        {product?.priceAfterDiscount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        LE
                      </span>

                      <span className="line-through text-white">
                        {product?.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        LE
                      </span>
                    </div>
                  ) : (
                    <span className="block group-hover/card:translate-x-0 translate-x-[510%] transition-all duration-700 delay-150 font-bold text-white">
                      {product?.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                      LE
                    </span>
                  )}
                </div>
              </div>
              {userLogin ? (
                <>
                  {cart?.data?.products.some(
                    (_productObj) => _productObj.product?.id === product?.id
                  ) ? (
                    <div className="flex flex-col gap-2 px-1 ">
                      <div className="group-hover/card:translate-x-0 -translate-x-[110%] transition-all duration-700 delay-150">
                        <QuantityInput productId={product?.id} />
                      </div>

                      <div className="btns flex justify-between p-2 pt-0 items-center">
                        <button
                          disabled={currentId === product?.id && loading}
                          onClick={() => deleteItem(product?.id)}
                          className="group-hover/card:translate-x-0 translate-x-[110%] transition-all duration-700 delay-150 disabled:cursor-not-allowed w-full p-2 group relative overflow-hidden bg-red-700 focus:ring-4 focus:ring-red-300 inline-flex items-center rounded-lg text-white justify-center"
                        >
                          {currentId === product?.id && loading ? (
                            <fontAwesome.FaSpinner className="mr-2 text-xl animate-spin" />
                          ) : (
                            <span className=" flex items-center">
                              <bootstrapIcons.BsFillCartDashFill className="me-2 text-xl" />
                              Remove from cart
                            </span>
                          )}
                          <div className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 group-hover:translate-x-[50%] z-20 duration-1000"></div>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="group-hover/card:translate-x-0 -translate-x-[110%] transition-all duration-700 delay-150 btns flex justify-between p-2 pt-0 items-center">
                      <button
                        type="button"
                        disabled={currentId === product?.id && loading}
                        onClick={() => {
                          addProduct(product?.id),
                            wishListIds.some((p) => p === product?.id)
                              ? deleteProductFromWishList(product?.id)
                              : null;
                        }}
                        className="disabled:cursor-not-allowed w-full p-2 group relative overflow-hidden bg-blue-700 focus:ring-4 focus:ring-blue-300 inline-flex items-center rounded-lg text-white justify-center"
                      >
                        {currentId === product?.id && loading ? (
                          <fontAwesome.FaSpinner className="mr-2 text-xl animate-spin" />
                        ) : (
                          <span className=" flex items-center">
                            <fontAwesome.FaCartPlus className="mr-2 text-xl" />
                            Add to cart
                          </span>
                        )}
                        <div className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 group-hover:translate-x-[50%] z-20 duration-1000"></div>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="group-hover/card:translate-x-0 -translate-x-[110%] transition-all duration-700 delay-150 btns flex justify-between p-2 pt-0 items-center">
                    <button
                      type="button"
                      onClick={() => {
                        setOpenModal(true);
                        setModalPlace("Cart");
                      }}
                      className=" w-full p-2 group relative overflow-hidden bg-blue-700 focus:ring-4 focus:ring-blue-300 inline-flex items-center rounded-lg text-white justify-center"
                    >
                      <span className=" flex items-center">
                        <fontAwesome.FaCartPlus className="mr-2 text-xl" />
                        Add to cart
                      </span>

                      <div className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 group-hover:translate-x-[50%] z-20 duration-1000"></div>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
