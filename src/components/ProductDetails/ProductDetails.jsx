import React, { useContext, useEffect, useState } from "react";
import * as fontAwesome from "react-icons/fa"; //fontawesome icons
import * as bootstrapIcons from "react-icons/bs"; //bootstrap icons
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCube,
  Pagination,
  Navigation,
  Autoplay,
  Zoom,
} from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import RatingStars from "../RatingStars/RatingStars";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import { CartContext } from "../../Context/CartContext/CartContext";
import MainLoading from "../MainLoading/MainLoading";
import QuantityInput from "../CartItem/QuantityInput";
import AddToWishListCheckBox from "../AddToWishListCheckBox/AddToWishListCheckBox";
import { WishListContext } from "../../Context/WishListContext/WishListContext";
import { Tabs } from "flowbite-react";
import SaleBadge from "../SaleBadge/SaleBadge";
import { Helmet } from "react-helmet";
import { UserContext } from "../../Context/UserContext/UserContext";
import AccessModal from "../AccessModal/AccessModal";
import { motion } from "framer-motion";

export default function ProductDetails() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { addProductToCart, cart, deleteCartItem } = useContext(CartContext);
  const { deleteProductFromWishList, wishListIds } =
    useContext(WishListContext);
  const { userLogin } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  //add product to cart
  async function addProduct(productId) {
    setCurrentId(productId);
    setLoading(true);
    const response = await addProductToCart(productId);
    setLoading(false);
  }

  async function deleteItem(productId) {
    setCurrentId(productId);
    setLoading(true);
    const response = await deleteCartItem(productId);
    setLoading(false);
  }

  const { id = "" } = useParams();

  const [bigSlider, setBigSlider] = useState(false);

  //product details
  const { data: productDetails, isLoading } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: async () =>
      await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`),
    select: (data) => data.data.data,

    staleTime: 1000 * 60 * 60, // 1 hour
  });

  function closeBigSlider(event) {
    if (event.target.classList.contains("big-slider")) {
      setBigSlider(false);
    } else {
      setBigSlider(true);
    }
  }
  const [openModal, setOpenModal] = useState(false);
  const [ModalPlace, setModalPlace] = useState("");

  if (isLoading) {
    return <MainLoading />;
  }

  return (
    <>
      <Helmet>
        <title>{productDetails?.title}</title>
      </Helmet>
      <>
        <div className="container py-24 min-h-screen">
          {bigSlider && (
            <div
              onMouseDown={(e) => closeBigSlider(e)}
              className="details-slider overflow-hidden flex justify-center items-center big-slider fixed inset-0 p-10 bg-black/85 z-50"
            >
              <Swiper
                pagination={{
                  clickable: true,
                }}
                zoom={true}
                cubeEffect={{
                  shadow: true,
                  slideShadows: true,
                  shadowOffset: 20,
                  shadowScale: 0.94,
                }}
                navigation={true}
                modules={[Navigation, Zoom, Pagination]}
                className="w-full sm:w-3/4 md:w-1/2 xl:w-1/3  "
              >
                {productDetails?.images.map((img) => (
                  <SwiperSlide key={img}>
                    <div className="swiper-zoom-container">
                      <img
                        className="cursor-zoom-in"
                        src={img}
                        title="double click to zoom"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
          <section className="py-10 max-w-screen-xl mx-auto my-6  p-0 sm:p-3 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 gap-3 ">
              {/* Product Images */}
              <div className="w-auto details-slider md:col-span-2 lg:col-span-2">
                <Swiper
                  effect={"cube"}
                  cubeEffect={{
                    shadow: true,
                    slideShadows: true,
                    shadowOffset: 20,
                    shadowScale: 0.94,
                  }}
                  pagination={true}
                  navigation={true}
                  modules={[EffectCube, Navigation, Autoplay, Pagination]}
                  className="relative "
                >
                  {productDetails?.images?.length > 1 ? (
                    productDetails?.images.map((img) => {
                      return (
                        <SwiperSlide key={img}>
                          <img
                            title="click for details"
                            src={img}
                            alt={productDetails?.title}
                            onClick={() => setBigSlider(true)}
                            role="button"
                            className=""
                          />
                        </SwiperSlide>
                      );
                    })
                  ) : (
                    <SwiperSlide>
                      <img
                        src={productDetails?.imageCover}
                        alt={productDetails?.title}
                      />
                    </SwiperSlide>
                  )}
                  <AddToWishListCheckBox
                    product={productDetails}
                    setModalPlace={setModalPlace}
                    setOpenModal={setOpenModal}
                  />
                  <SaleBadge top={"-top-3"} product={productDetails} />
                </Swiper>
              </div>
              {/* Product Details */}
              <div className="ps-2 flex flex-col md:col-span-3 lg:col-span-4">
                <h2 className="text-3xl font-bold mb-3">
                  {productDetails.title}
                </h2>

                <RatingStars rating={productDetails?.ratingsAverage} />

                <div>
                  <ul className="flex flex-col gap-4 mt-3 list-inside text-gray-700">
                    <li className="dark:text-gray-400 text-gray-600 flex flex-wrap gap-2 items-center">
                      <fontAwesome.FaCircle className="text-[9px]" />
                      Category:{" "}
                      <Link
                        to={`/${productDetails?.category?.name}/Products/${productDetails?.category?._id}/category`}
                        className="flex items-center gap-1 hover:underline"
                      >
                        <span className="text-black dark:text-white font-semibold">
                          {productDetails?.category?.name ?? ""}
                        </span>
                        <img
                          src={productDetails?.category?.image}
                          className="w-12 h-10 rounded-lg"
                          alt=""
                        />
                      </Link>
                    </li>
                    <li className="dark:text-gray-400 text-gray-600 flex flex-wrap gap-2 items-center">
                      <fontAwesome.FaCircle className="text-[9px]" />
                      Brand:{" "}
                      <Link
                        to={`/${productDetails?.brand?.name}/Products/${productDetails?.brand?._id}/brand`}
                        className="flex items-center gap-1 hover:underline"
                      >
                        <span className="text-black dark:text-white font-semibold">
                          {productDetails?.brand?.name ?? ""}
                        </span>
                        <img
                          src={productDetails?.brand?.image}
                          className="w-12 h-10 rounded-lg"
                          alt=""
                        />
                      </Link>
                    </li>
                    <li className="dark:text-gray-400 text-gray-600 flex flex-wrap gap-2 items-center">
                      <fontAwesome.FaCircle className="text-[9px]" />
                      Subcategory:{" "}
                      <span className="text-black dark:text-white font-semibold">
                        {productDetails?.subcategory?.[0]?.name ?? ""}
                      </span>
                    </li>

                    <li className="dark:text-gray-400 text-gray-600 flex flex-wrap gap-2 items-center">
                      <fontAwesome.FaCircle className="text-[9px]" />
                      Status :{" "}
                      <span
                        className={`${
                          productDetails?.quantity > 0
                            ? "text-green-500"
                            : "text-red-500"
                        }  font-semibold`}
                      >
                        {productDetails?.quantity > 0
                          ? "In stock now"
                          : "Out of stock"}
                      </span>{" "}
                    </li>
                    <li className="dark:text-gray-400 text-gray-600 flex flex-wrap gap-2 items-center">
                      <fontAwesome.FaCircle className="text-[9px]" />
                      Sold:{" "}
                      <span className="text-black dark:text-white font-semibold">
                        {productDetails?.sold}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="my-4 flex items-center gap-3 flex-wrap">
                  {productDetails?.priceAfterDiscount > 0 ? (
                    <>
                      <span className="font-bold text-2xl">
                        {productDetails?.priceAfterDiscount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        EGP
                      </span>

                      <span className="line-through ">
                        {productDetails?.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        EGP
                      </span>
                    </>
                  ) : (
                    <span className=" font-bold text-2xl">
                      {productDetails?.price
                        ?.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                      EGP
                    </span>
                  )}
                </div>
                <div className="flex justify-between lg:my-auto my-2">
                  {userLogin ? (
                    <>
                      {cart?.data?.products.some(
                        (_productObj) =>
                          _productObj.product?.id === productDetails?.id
                      ) ? (
                        <div className="flex flex-col w-full mt-1 items-center gap-2 px-1">
                          <div className="self-start flex flex-wrap items-center gap-3">
                            <span className="font-bold">QTY :</span>
                            <QuantityInput productId={productDetails?.id} />
                          </div>

                          <div className="btns flex w-full mt-3 justify-between items-center">
                            <button
                              disabled={
                                currentId === productDetails?.id && loading
                              }
                              onClick={() => deleteItem(productDetails?.id)}
                              className="disabled:cursor-not-allowed w-full p-2 group relative overflow-hidden bg-red-700 focus:ring-4 focus:ring-red-300 inline-flex items-center rounded-lg text-white justify-center"
                            >
                              {currentId === productDetails?.id && loading ? (
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
                        <div className="btns flex mt-1 justify-between w-full items-center">
                          <button
                            type="button"
                            disabled={
                              currentId === productDetails?.id && loading
                            }
                            onClick={() =>
                              addProduct(productDetails?.id).then(() => {
                                wishListIds.some((p) => p === productDetails.id)
                                  ? deleteProductFromWishList(
                                      productDetails?.id
                                    )
                                  : null;
                              })
                            }
                            className="disabled:cursor-not-allowed w-full p-2 group relative overflow-hidden bg-blue-700 focus:ring-4 focus:ring-blue-300 inline-flex items-center rounded-lg text-white justify-center"
                          >
                            {currentId === productDetails?.id && loading ? (
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
                    <div className="btns flex mt-1 justify-between w-full items-center">
                      {openModal && (
                        <AccessModal
                          setOpenModal={setOpenModal}
                          place={ModalPlace}
                        />
                      )}
                      <button
                        type="button"
                        disabled={currentId === productDetails?.id && loading}
                        onClick={() => {
                          setOpenModal(true);
                          setModalPlace("Cart");
                        }}
                        className="w-full p-2 group relative overflow-hidden bg-blue-700 focus:ring-4 focus:ring-blue-300 inline-flex items-center rounded-lg text-white justify-center"
                      >
                        <span className=" flex items-center">
                          <fontAwesome.FaCartPlus className="mr-2 text-xl" />
                          Add to cart
                        </span>

                        <div className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 group-hover:translate-x-[50%] z-20 duration-1000"></div>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Tabs
              aria-label="Full width tabs"
              className="my-2 bg-white/70 dark:bg-black/70 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded"
              variant="fullWidth"
            >
              <Tabs.Item
                active
                className="text-xl font-bold mb-2 "
                title="Description"
                icon={fontAwesome.FaBookOpen}
              >
                <motion.p
                  initial={{ opacity: 0, y: -50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-slate-800 dark:text-slate-300 p-3 leading-loose mb-6"
                >
                  {productDetails?.description}
                </motion.p>
              </Tabs.Item>
              <Tabs.Item title="Reviews" icon={fontAwesome.FaComments}>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {productDetails?.reviews?.length === 0 ? (
                    <h1 className="text-center p-3 text-xl">
                      No reviews yet for this product
                    </h1>
                  ) : (
                    productDetails?.reviews?.map((review, index) => (
                      <div key={index} className="sm:flex gap-6 p-1 sm:p-5">
                        <img
                          src="https://pagedone.io/asset/uploads/1704364549.png"
                          alt="Robert image"
                          className="w-32 h-32 rounded-full"
                        />
                        <div className="text">
                          <p className="font-medium text-lg leading-8 dark:text-gray-300 text-gray-900 mb-2">
                            Robert Karmazov
                          </p>

                          <p className="font-normal text-base leading-7 dark:text-gray-400 text-gray-600 mb-4 lg:pr-8">
                            One of the standout features of Pagedone is its
                            intuitive and user-friendly interface. Navigating
                            through the system feels natural, and the layout
                            makes it easy to locate and utilize various design
                            elements. This is particularly beneficial for
                            designers looking to streamline their workflow.
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="cursor-pointers flex items-center gap-2">
                              <a
                                href="javascript:;"
                                className="font-semibold text-lg cursor-pointer leading-8 text-blue-600 whitespace-nowrap"
                              >
                                View &amp; Reply
                              </a>
                            </div>
                            <p className="lg:hidden font-medium text-sm leading-7 text-gray-400 lg:text-center whitespace-nowrap">
                              Nov 01, 2023
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </motion.div>
              </Tabs.Item>
            </Tabs>
          </section>
          <RelatedProducts
            setModalPlace={setModalPlace}
            setOpenModal={setOpenModal}
          />
        </div>
      </>
    </>
  );
}
