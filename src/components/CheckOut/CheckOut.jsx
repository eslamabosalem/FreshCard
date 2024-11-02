import React, { useContext, useEffect, useState } from "react";
import * as fontAwesome from "react-icons/fa"; //fontawesome icons
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import MainLoading from "../MainLoading/MainLoading.jsx";
import { GiTakeMyMoney } from "react-icons/gi";
import { CartContext } from "../../Context/CartContext/CartContext.jsx";
import { Bounce, toast } from "react-toastify";
import { OrdersContext } from "../../Context/OrdersContext/OrdersContext.jsx";
import { Helmet } from "react-helmet";
import { UserContext } from "../../Context/UserContext/UserContext.jsx";

export default function CheckOut() {
  const { cartId } = useParams();
  const { clearCart, productsCount, cart, getCart } = useContext(CartContext);
  const { userAddresses } = useContext(UserContext);

  const navigate = useNavigate();

  // check if cart is empty (protect checkout page)
  useEffect(() => {
    if (cashSuccess) {
      return;
    } else {
      if (productsCount === 0 || productsCount === null) {
        if (!cart) {
          getCart();
        } else {
          navigate("/cart");
        }
      }
    }
  }, [productsCount, cart]);

  const [isLoading, setIsLoading] = useState(false);
  const [cashSuccess, setCashSuccess] = useState(false);
  const [thank, setThank] = useState(null);

  const formValidation = Yup.object().shape({
    details: Yup.string().min(10).required("Details Is Required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Phone Number Must Be Egyptian")
      .required("Phone Number Is Required"),
    city: Yup.string().required("City Is Requierd"),
  });

  const formik = useFormik({
    initialValues: {
      details: userAddresses?.length === 0 ? "" : userAddresses?.[0]?.details,
      phone: userAddresses?.length === 0 ? "" : userAddresses?.[0]?.phone,
      city: userAddresses?.length === 0 ? "" : userAddresses?.[0]?.city,
    },
    validationSchema: formValidation,
    onSubmit: onlineSubmit,
  });

  async function onlineSubmit(values) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        { shippingAddress: values },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
          params: {
            url: window.location.origin,
          },
        }
      );
      setIsLoading(false);
      window.location.href = data.session.url;
    } catch (error) {
      setIsLoading(false);
    }
  }

  const { refetch } = useContext(OrdersContext);
  async function cashSubmit() {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { shippingAddress: formik.values },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );

      setCashSuccess(true);
      refetch();
      clearCart();
      toast.success("order placed successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <MainLoading />;
  }

  return (
    <>
      <Helmet>
        <title>Check Out</title>
      </Helmet>
      <div className="container py-24 min-h-screen">
        {cashSuccess && (
          <div className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-black">
            <div className="card" onMouseEnter={() => setThank(true)}>
              <div className="relative bg-black w-[300px] sm:w-[350px] md:w-[450px] group transition-all duration-700 aspect-video flex items-center justify-center">
                <div className="transition-all flex flex-col items-center py-5 justify-start duration-300 group-hover:duration-1000 bg-white w-full h-full absolute group-hover:-translate-y-16">
                  <p className="text-xl sm:text-2xl font-semibold text-gray-500 font-serif">
                    Thank You For Your Order
                  </p>
                  <p className="px-10 text-[10px] sm:text-[12px] text-gray-700">
                    It’s so nice that you had time to shopping with us.
                  </p>
                  <p className="font-serif text-[10px] mt-1 sm:text-[12px text-gray-700">
                    Wishing you a fantastic day ahead! ❤
                  </p>
                  <p className="font-sans text-[10px] text-gray-700 flex items-center pt-5">
                    <fontAwesome.FaShoppingCart className="me-1" />
                    Fresh Cart
                  </p>
                </div>
                <button className="seal bg-blue-500 text-white w-10 aspect-square rounded-full z-40 text-[10px] flex items-center justify-center font-semibold [clip-path:polygon(50%_0%,_80%_10%,_100%_35%,_100%_70%,_80%_90%,_50%_100%,_20%_90%,_0%_70%,_0%_35%,_20%_10%)] group-hover:opacity-0 transition-all duration-1000 group-hover:scale-0 group-hover:rotate-180 border-4 border-blue-900">
                  <fontAwesome.FaHeart className="text-xl" />
                </button>
                <div className="tp transition-all duration-1000 group-hover:duration-100 bg-gray-800 absolute group-hover:[clip-path:polygon(50%_0%,_100%_0,_0_0)] w-full h-full [clip-path:polygon(50%_50%,_100%_0,_0_0)]" />
                <div className="lft transition-all duration-700 absolute w-full h-full bg-gray-900 [clip-path:polygon(50%_50%,_0_0,_0_100%)]" />
                <div className="rgt transition-all duration-700 absolute w-full h-full bg-gray-800 [clip-path:polygon(50%_50%,_100%_0,_100%_100%)]" />
                <div className="btm transition-all duration-700 absolute w-full h-full bg-gray-900 [clip-path:polygon(50%_50%,_100%_100%,_0_100%)]" />
              </div>
            </div>
            {thank && (
              <Link
                to={`/allorders`}
                className="block w-[300px] sm:w-[350px] mt-4 text-center group/button relative items-center justify-center overflow-hidden rounded-md bg-blue-700 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-blue-600/50 border border-white/20"
              >
                <span className="text-lg">Go To Your Orders</span>
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                  <div className="relative h-full w-10 bg-white/30" />
                </div>
              </Link>
            )}
          </div>
        )}

        <div className="min-h-screen  py-6 flex flex-col justify-center sm:py-0">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-blue-700 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="text-white relative px-4 py-10 dark:bg-slate-600 bg-gray-800 shadow-lg sm:rounded-3xl sm:p-20">
              <div className="text-center pb-6">
                <h1 className="text-3xl font-bold">Your Shipping Address</h1>
              </div>
              <form className="flex flex-col gap-3">
                <div
                  className={`${
                    formik.errors.details && formik.touched.details
                      ? "shake"
                      : null
                  } relative`}
                >
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <fontAwesome.FaClipboardList className="dark:text-gray-300 text-gray-600" />
                  </div>
                  <input
                    value={formik.values.details}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    id="details"
                    className={`${
                      formik.errors.details && formik.touched.details
                        ? " focus:ring-red-800 focus:border-red-800 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-800 dark:focus:border-red-800 rounded-lg dark:border-red-800 border-red-800 border-2 text-black"
                        : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    } `}
                    placeholder="Details"
                  />
                </div>

                {formik.errors.details && formik.touched.details ? (
                  <>
                    <div
                      className="flex items-center animate__shakeX p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                      role="alert"
                    >
                      <fontAwesome.FaExclamationCircle className="text-xl mr-2" />
                      <p className="font-medium">{formik.errors.details}</p>
                    </div>
                  </>
                ) : null}

                <div
                  className={`${
                    formik.errors.phone && formik.touched.phone ? "shake" : null
                  } relative`}
                >
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <fontAwesome.FaPhoneAlt className="dark:text-gray-300 text-gray-600" />
                  </div>
                  <input
                    value={formik.values.phone}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="tel"
                    id="phone"
                    className={`${
                      formik.errors.phone && formik.touched.phone
                        ? " focus:ring-red-800 focus:border-red-800 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-800 dark:focus:border-red-800 rounded-lg dark:border-red-800 border-red-800 border-2 text-black"
                        : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    } `}
                    placeholder="Phone number"
                  />
                </div>

                {formik.errors.phone && formik.touched.phone ? (
                  <>
                    <div
                      className="flex items-center animate__shakeX p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                      role="alert"
                    >
                      <fontAwesome.FaExclamationCircle className="text-xl mr-2" />
                      <p className="font-medium">{formik.errors.phone}</p>
                    </div>
                  </>
                ) : null}

                <div
                  className={`${
                    formik.errors.city && formik.touched.city ? "shake" : null
                  } relative`}
                >
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <fontAwesome.FaMapMarkedAlt className="dark:text-gray-300 text-gray-600" />
                  </div>
                  <input
                    value={formik.values.city}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    id="city"
                    className={`${
                      formik.errors.city && formik.touched.city
                        ? " focus:ring-red-800 focus:border-red-800 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-800 dark:focus:border-red-800 rounded-lg dark:border-red-800 border-red-800 border-2 text-black"
                        : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    } `}
                    placeholder="City location"
                  />
                </div>

                {formik.errors.city && formik.touched.city ? (
                  <>
                    <div
                      className="flex items-center animate__shakeX p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                      role="alert"
                    >
                      <fontAwesome.FaExclamationCircle className="text-xl mr-2" />
                      <p className="font-medium">{formik.errors.city}</p>
                    </div>
                  </>
                ) : null}

                <button
                  disabled={
                    formik.values.city == userAddresses?.[0]?.city &&
                    formik.values.details == userAddresses?.[0]?.details &&
                    formik.values.phone == userAddresses?.[0]?.phone
                      ? false
                      : !(formik.isValid && formik.dirty)
                      ? true
                      : false
                  }
                  onClick={() => {
                    formik.handleSubmit();
                  }}
                  type="submit"
                  className="disabled:cursor-not-allowed disabled:hover:shadow-none disabled:bg-blue-950 disabled:shadow-none disabled:text-slate-500 w-full shadow-2xl transition-all duration-300 hover:shadow-blue-700 group relative overflow-hidden bg-blue-600 focus:ring-4 focus:ring-blue-300 inline-flex items-center px-7 py-2.5 rounded-lg text-white justify-center"
                >
                  <span className="z-40 flex items-center font-bold">
                    <fontAwesome.FaMoneyCheck className="me-2 text-2xl" />
                    Online payment
                  </span>
                  <div className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 group-disabled:group-hover:translate-x-[-70%] group-hover:translate-x-[50%] z-20 duration-1000"></div>
                </button>
              </form>
              <button
                disabled={
                  formik.values.city == userAddresses?.[0]?.city &&
                  formik.values.details == userAddresses?.[0]?.details &&
                  formik.values.phone == userAddresses?.[0]?.phone
                    ? false
                    : !(formik.isValid && formik.dirty)
                    ? true
                    : false
                }
                onClick={() => {
                  cashSubmit().then(() => {
                    formik.resetForm();
                  });
                }}
                className="disabled:cursor-not-allowed disabled:hover:shadow-none disabled:bg-green-950 disabled:text-slate-500 disabled:shadow-none w-full mt-2 shadow-2xl transition-all duration-300 hover:shadow-green-700 group relative overflow-hidden bg-green-600 focus:ring-4 focus:ring-green-300 inline-flex items-center px-7 py-2.5 rounded-lg text-white justify-center"
              >
                <span className="z-40 flex items-center font-bold">
                  <GiTakeMyMoney className="me-2 text-3xl" />
                  Cash payment
                </span>
                <div className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 group-disabled:group-hover:translate-x-[-70%] group-hover:translate-x-[50%] z-20 duration-1000"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
