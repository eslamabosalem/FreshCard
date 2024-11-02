import React, { useContext, useState } from "react";
import * as fontAwesome from "react-icons/fa"; //fontawesome icons
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext/UserContext.jsx";
import MainLoading from "../MainLoading/MainLoading.jsx";
import { MdAddLocationAlt } from "react-icons/md";
import { Tooltip } from "flowbite-react";
import { Helmet } from "react-helmet";

export default function AddAddress() {
  const { addAddress } = useContext(UserContext);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const formValidation = Yup.object().shape({
    name: Yup.string().required("Name Is Required"),
    details: Yup.string().min(10).required("Details Is Required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Phone Number Must Be Egyptian")
      .required("Phone Number Is Required"),
    city: Yup.string().required("City Is Requierd"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      details: "",
      phone: "",
      city: "",
    },
    validationSchema: formValidation,
    onSubmit: addUserAddress,
  });

  async function addUserAddress(values) {
    formik.resetForm();
    setIsLoading(true);
    const response = await addAddress(values);
    setIsLoading(false);
  }

  if (isLoading) {
    return <MainLoading />;
  }

  return (
    <>
      <Helmet>
        <title>Add Address</title>
      </Helmet>
      <div className="container py-24 min-h-screen">
        <div className="min-h-screen  py-6 flex flex-col justify-center sm:py-0">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-blue-700 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="text-white relative px-4 py-10 dark:bg-slate-600 bg-gray-800 shadow-lg sm:rounded-3xl sm:p-20">
              <div className="back absolute top-6 left-6 hover:bg-blue-950 bg-blue-900 rounded w-10 h-10 flex justify-center">
                <Tooltip
                  content="Back To Account Details"
                  className="w-48"
                  placement="right"
                >
                  <Link
                    onClick={() => navigate(-1)}
                    className="block hover:text-white relative transition-all duration-[0.3s] p-1 m-1 md:!mx-0 text-2xl"
                  >
                    <fontAwesome.FaArrowAltCircleLeft />
                  </Link>
                </Tooltip>
              </div>
              <div className="text-center pb-6">
                <h1 className="text-3xl font-bold">Your Shipping Address</h1>
              </div>
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-3"
              >
                <div
                  className={`${
                    formik.errors.name && formik.touched.name ? "shake" : null
                  } relative`}
                >
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <fontAwesome.FaUser className="dark:text-gray-300 text-gray-600" />
                  </div>
                  <input
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    id="name"
                    className={`${
                      formik.errors.name && formik.touched.name
                        ? " focus:ring-red-800 focus:border-red-800 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-800 dark:focus:border-red-800 rounded-lg dark:border-red-800 border-red-800 border-2 text-black"
                        : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    } `}
                    placeholder="name"
                  />
                </div>
                {formik.errors.name && formik.touched.name ? (
                  <>
                    <div
                      className="flex items-center animate__shakeX p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                      role="alert"
                    >
                      <fontAwesome.FaExclamationCircle className="text-xl mr-2" />
                      <p className="font-medium">{formik.errors.name}</p>
                    </div>
                  </>
                ) : null}

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
                        ? " focus:ring-red-800 focus:border-red-800 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-800 dark:focus:border-red-800 rounded-lg dark:border-red-800 border-red-800 border-2"
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
                  disabled={!(formik.isValid && formik.dirty)}
                  type="submit"
                  className="disabled:cursor-not-allowed disabled:hover:shadow-none disabled:bg-blue-950 disabled:shadow-none disabled:text-slate-500 w-full shadow-2xl transition-all duration-300 hover:shadow-blue-700 group relative overflow-hidden bg-blue-600 focus:ring-4 focus:ring-blue-300 inline-flex items-center px-7 py-2.5 rounded-lg text-white justify-center"
                >
                  <span className="z-40 flex items-center font-bold">
                    <MdAddLocationAlt className="me-2 text-2xl" />
                    Add Address
                  </span>
                  <div className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 group-disabled:group-hover:translate-x-[-70%] group-hover:translate-x-[50%] z-20 duration-1000"></div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
