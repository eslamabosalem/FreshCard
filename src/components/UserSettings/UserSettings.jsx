import React, { useContext, useState } from "react";
import * as fontAwesome from "react-icons/fa"; //fontawesome icons
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiUserCircle } from "react-icons/hi";
import { UserContext } from "../../Context/UserContext/UserContext";
import { MdAddLocationAlt } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdWrongLocation } from "react-icons/md";
import { MdLocationOff } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import Title from "../Title/Title";

export default function UserSettings() {
  const navigate = useNavigate();
  const [newPasswordError, setNewPasswordError] = useState("");
  const [dataError, setDataError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [valueLoader, setValueLoader] = useState("");

  const {
    setUserLogin,
    setUserName,
    setUserEmail,
    userName,
    userEmail,
    userAddresses,
    deleteAddress,
    updateData,
    updatePassword,
  } = useContext(UserContext);

  const [currentPassShow, setCurrentPassShow] = useState(false);
  const [newPassShow, setNewPassShow] = useState(false);
  const [confirmPassShow, setConfirmPassShow] = useState(false);

  //!update data//////////////////////////////////////////
  const dataValidation = Yup.object().shape({
    name: Yup.string()
      .min(3, "minimum length is 3 characters")
      .max(20, "maximum length is 20 characters")
      .required("User Name Is Required"),
    email: Yup.string().email("Invalid email").required("Email Is Required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Phone Number Must Be Egyptian")
      .required("Phone Number Is Required"),
  });
  const dataFormik = useFormik({
    initialValues: {
      name: userName,
      email: userEmail,
      phone: "",
    },
    validationSchema: dataValidation,
    onSubmit: updateUserData,
  });
  async function updateUserData(values) {
    setValueLoader("data");

    setSaveLoading(true);
    const response = await updateData(values);
    setSaveLoading(false);
    if (response.message == "success") {
      setDataError("");
    } else {
      setDataError(response.response.data.errors.msg);
    }
  }

  //!update password///////////////////////////////////////////////

  const passwordValidation = Yup.object().shape({
    currentPassword: Yup.string().required("Current password Is Requierd"),
    password: Yup.string()
      .min(
        8,
        <p className="font-medium"> password must be at least 8 characters</p>
      )
      .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/, {
        message: (
          <ul className="list-none flex flex-col gap-1 font-medium">
            <li>password must start with uppercase letter,</li>
            <li>at least 8 characters,</li>
            <li>at least one number,</li>
            <li>and one special character (#?!@$%^&*-)</li>
          </ul>
        ),
      })
      .required(<p className="font-medium">Password Is Required</p>),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password not matched")
      .required("Please Confirm Your Password"),
  });

  const newPasswordFormik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    validationSchema: passwordValidation,
    onSubmit: updateUserPassword,
  });

  async function updateUserPassword(values) {
    setValueLoader("pass");
    setSaveLoading(true);
    const response = await updatePassword(values);
    setSaveLoading(false);
    if (response.message == "success") {
      setNewPasswordError("");
      localStorage.removeItem("userToken");
      setUserLogin(null);
      setUserName(null);
      setUserEmail(null);
      navigate("/login");
    } else {
      setNewPasswordError(response.response.data.errors.msg);
    }
  }

  const [currentId, setCurrentId] = useState(0);
  //!delete address////////////////////////////////////////////////////////
  async function deleteUserAddress(addressId) {
    setCurrentId(addressId);
    setIsLoading(true);
    const response = await deleteAddress(addressId);
    setIsLoading(false);
  }

  return (
    <>
      <Helmet>
        <title>User Settings</title>
      </Helmet>
      <div className="container py-24 min-h-screen flex flex-col justify-center">
        <section className="py-10">
          <Title title={"Account Details"} my={"my-8"} />

          <Tabs aria-label="Tabs with icons" variant="underline">
            <Tabs.Item active title="Details" icon={HiUserCircle}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg ">
                  <div className=" px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y divide-gray-400 dark:sm:divide-gray-500">
                      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium ">User name</dt>
                        <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2">
                          {userName}
                        </dd>
                      </div>
                      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium ">Email address</dt>
                        <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2">
                          {userEmail}
                        </dd>
                      </div>
                      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium ">Phone number</dt>
                        <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2">
                          01*********
                        </dd>
                      </div>
                      <div className="py-3 items-center sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium ">Addresses</dt>
                        <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2">
                          <div className="flex flex-wrap gap-3">
                            {userAddresses.length === 0
                              ? "You have not saved any address yet."
                              : userAddresses.map((address, idx) => (
                                  <span
                                    key={idx}
                                    className="bg-orange-100 text-orange-800 font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-orange-400 border border-orange-400"
                                  >
                                    {address.name}
                                  </span>
                                ))}
                          </div>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </motion.div>
            </Tabs.Item>

            <Tabs.Item title="Addresses" icon={FaMapLocationDot}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {userAddresses.length === 0 ? (
                  <div className="w-full flex flex-col items-center gap-3 h-full text-center">
                    <h2 className="font-bold text-center text-3xl">
                      You have not saved any address yet.
                    </h2>
                    <MdLocationOff className="text-[10rem]" />
                  </div>
                ) : (
                  <div className="grid mb-8 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-2 bg-white dark:bg-gray-800">
                    {userAddresses.map((address, idx) => (
                      <div
                        key={idx}
                        className="flex flex-wrap gap-4 items-start justify-around px-2 sm:px-0 py-8 bg-white border-b border-gray-300 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-600"
                      >
                        <ul className=" flex flex-col flex-wrap gap-y-3 gap-x-6 text-gray-500 dark:text-gray-400">
                          <li className="dark:text-gray-400 text-gray-600">
                            name :{" "}
                            <span className="text-black dark:text-white font-semibold">
                              {address?.name}
                            </span>{" "}
                          </li>
                          <li className="dark:text-gray-400 text-gray-600">
                            details :{" "}
                            <span className="text-black dark:text-white font-semibold">
                              {address?.details}{" "}
                            </span>{" "}
                          </li>
                          <li className="dark:text-gray-400 text-gray-600">
                            phone :{" "}
                            <span className="text-black dark:text-white font-semibold">
                              {address?.phone}{" "}
                            </span>{" "}
                          </li>
                          <li className="dark:text-gray-400 text-gray-600">
                            city :{" "}
                            <span className="text-black dark:text-white font-semibold">
                              {address?.city}{" "}
                            </span>{" "}
                          </li>
                        </ul>
                        <button
                          disabled={currentId === address._id && isLoading}
                          onClick={() => deleteUserAddress(address._id)}
                          className="disabled:cursor-not-allowed bg-red-950 self-center flex items-center text-red-200 border border-red-400 border-b-4 font-medium overflow-hidden relative px-2 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
                        >
                          {currentId === address._id && isLoading ? (
                            <fontAwesome.FaSpinner className="animate-spin m-2" />
                          ) : (
                            <>
                              <span className="bg-red-400 shadow-red-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                              <MdWrongLocation className="me-2 text-xl" />
                              Remove Address
                            </>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <Link
                  to={"/addAddress"}
                  className="sm:w-52 mx-auto my-5 disabled:cursor-not-allowed bg-blue-950 flex items-center text-blue-200 border border-blue-400 border-b-4 font-medium overflow-hidden relative px-2 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
                >
                  <span className="bg-blue-400 shadow-blue-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                  <MdAddLocationAlt className="me-2 text-xl" />
                  Add Address
                </Link>
              </motion.div>
            </Tabs.Item>

            <Tabs.Item title="Settings" icon={HiAdjustments}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Data */}
                <h2 className="text-2xl font-bold mb-5 dark:text-slate-300 text-gray-800">
                  Update Details?
                </h2>
                <form
                  onSubmit={dataFormik.handleSubmit}
                  className=" sm:border sm:border-slate-400 dark:sm:border-slate-700 sm:p-3 rounded"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {/* name */}
                    <div className="name">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        New User Name
                      </label>
                      <div className="relative mt-3">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                          <fontAwesome.FaUser className="dark:text-gray-500 text-gray-400" />
                        </div>

                        <input
                          onFocus={(e) => {
                            e.target.classList.replace(
                              "dark:text-gray-500",
                              "dark:text-white"
                            ),
                              e.target.classList.replace(
                                "text-gray-400",
                                "text-black"
                              );
                          }}
                          onChange={dataFormik.handleChange}
                          value={dataFormik.values.name}
                          onBlur={dataFormik.handleBlur}
                          className=" bg-gray-50 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          type="text"
                          placeholder="New Name"
                          name="name"
                          id="name"
                        />
                      </div>
                      {dataFormik.errors.name && dataFormik.touched.name ? (
                        <>
                          <fontAwesome.FaExclamationCircle
                            className={`${
                              dataFormik.errors.name && dataFormik.touched.name
                                ? "shake"
                                : null
                            } absolute top-11 right-4 text-red-800  dark:text-red-400 text-xl`}
                          />
                          <div
                            className="flex items-center p-4 mt-2 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                            role="alert"
                          >
                            <fontAwesome.FaExclamationCircle className="text-xl mr-2" />
                            <p className="font-medium">
                              {dataFormik.errors.name}
                            </p>
                          </div>
                        </>
                      ) : null}
                    </div>

                    {/* email */}
                    <div className="email">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        New Email
                      </label>
                      <div className="relative mt-3">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                          <fontAwesome.FaEnvelope className="dark:text-gray-500 text-gray-400" />
                        </div>

                        <input
                          onFocus={(e) => {
                            e.target.classList.replace(
                              "dark:text-gray-500",
                              "dark:text-white"
                            ),
                              e.target.classList.replace(
                                "text-gray-400",
                                "text-black"
                              );
                          }}
                          onChange={dataFormik.handleChange}
                          value={dataFormik.values.email}
                          onBlur={dataFormik.handleBlur}
                          className=" bg-gray-50 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          type="email"
                          placeholder="New Email"
                          name="email"
                          id="email"
                        />
                      </div>
                      {dataFormik.errors.email && dataFormik.touched.email ? (
                        <>
                          <fontAwesome.FaExclamationCircle
                            className={`${
                              dataFormik.errors.email &&
                              dataFormik.touched.email
                                ? "shake"
                                : null
                            } absolute top-11 right-4 text-red-800  dark:text-red-400 text-xl`}
                          />
                          <div
                            className="flex items-center p-4 mt-2 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                            role="alert"
                          >
                            <fontAwesome.FaExclamationCircle className="text-xl mr-2" />
                            <p className="font-medium">
                              {dataFormik.errors.email}
                            </p>
                          </div>
                        </>
                      ) : null}
                    </div>
                    {/* phone */}
                    <div className="phone">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        New Phone
                      </label>
                      <div className="relative mt-3">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                          <fontAwesome.FaPhoneAlt className="dark:text-gray-500 text-gray-400" />
                        </div>

                        <input
                          onChange={dataFormik.handleChange}
                          value={dataFormik.values.phone}
                          onBlur={dataFormik.handleBlur}
                          className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          type="tel"
                          placeholder="New Phone"
                          name="phone"
                          id="phone"
                        />
                      </div>
                      {dataFormik.errors.phone && dataFormik.touched.phone ? (
                        <>
                          <fontAwesome.FaExclamationCircle
                            className={`${
                              dataFormik.errors.phone &&
                              dataFormik.touched.phone
                                ? "shake"
                                : null
                            } absolute top-11 right-4 text-red-800  dark:text-red-400 text-xl`}
                          />
                          <div
                            className="flex items-center p-4 mt-2 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                            role="alert"
                          >
                            <fontAwesome.FaExclamationCircle className="text-xl mr-2" />
                            <p className="font-medium">
                              {dataFormik.errors.phone}
                            </p>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>

                  {dataError && (
                    <div
                      className="flex shake justify-center items-center p-4 mt-2 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                      role="alert"
                    >
                      <fontAwesome.FaExclamationCircle className="text-xl mr-2 fa-beat" />
                      <p className="font-medium">{dataError}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={
                      !(dataFormik.isValid && dataFormik.dirty) ||
                      (saveLoading && valueLoader == "data")
                    }
                    className="disabled:cursor-not-allowed disabled:hover:shadow-none disabled:bg-blue-950 disabled:text-slate-500 disabled:shadow-none mt-3 shadow-2xl transition-all duration-300 hover:shadow-blue-700 group relative overflow-hidden bg-blue-600 focus:ring-4 focus:ring-blue-300 inline-flex items-center px-7 py-2.5 rounded-lg text-white justify-center"
                  >
                    {saveLoading && valueLoader == "data" ? (
                      <fontAwesome.FaSpinner className="animate-spin" />
                    ) : (
                      <span className="z-40 flex items-center font-bold">
                        <fontAwesome.FaSave className="text-xl me-2" /> Save New
                        Data
                      </span>
                    )}

                    <div className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 group-disabled:group-hover:translate-x-[-70%] group-hover:translate-x-[50%] z-20 duration-1000"></div>
                  </button>
                </form>

                {/* password */}
                <h2 className="text-2xl font-bold my-5 dark:text-slate-300 text-gray-800">
                  Change Password?
                </h2>
                <form
                  onSubmit={newPasswordFormik.handleSubmit}
                  className="sm:border sm:border-slate-400 dark:sm:border-slate-700 sm:p-3 rounded"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {/* current */}
                    <div className="current-pass">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Current Password
                      </label>
                      <div className="relative mt-3">
                        {currentPassShow ? (
                          <fontAwesome.FaEyeSlash
                            onClick={() => setCurrentPassShow(!currentPassShow)}
                            className="cursor-pointer text-xl absolute right-3 top-3"
                          />
                        ) : (
                          <fontAwesome.FaEye
                            onClick={() => setCurrentPassShow(!currentPassShow)}
                            className="cursor-pointer text-xl absolute right-3 top-3"
                          />
                        )}
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                          <fontAwesome.FaLock className="dark:text-gray-500 text-gray-400" />
                        </div>

                        <input
                          onChange={newPasswordFormik.handleChange}
                          onBlur={newPasswordFormik.handleBlur}
                          value={newPasswordFormik.values.currentPassword}
                          className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          type={currentPassShow ? "text" : "password"}
                          placeholder="Current Password"
                          name="currentPassword"
                          id="currentPassword"
                          autoComplete="true"
                        />
                      </div>
                      {newPasswordFormik.errors.currentPassword &&
                      newPasswordFormik.touched.currentPassword ? (
                        <>
                          <fontAwesome.FaExclamationCircle
                            className={`${
                              newPasswordFormik.errors.currentPassword &&
                              newPasswordFormik.touched.currentPassword
                                ? "shake"
                                : null
                            } absolute top-11 right-4 text-red-800  dark:text-red-400 text-xl`}
                          />
                          <div
                            className="flex items-center p-4 mt-2 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                            role="alert"
                          >
                            <fontAwesome.FaExclamationCircle className="text-xl mr-2" />
                            <p className="font-medium">
                              {newPasswordFormik.errors.currentPassword}
                            </p>
                          </div>
                        </>
                      ) : null}
                    </div>

                    {/* new pass */}
                    <div className="new-pass1 ">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        New Password
                      </label>
                      <div className="relative mt-3">
                        {newPassShow ? (
                          <fontAwesome.FaEyeSlash
                            onClick={() => setNewPassShow(!newPassShow)}
                            className="cursor-pointer text-xl absolute right-3 top-3"
                          />
                        ) : (
                          <fontAwesome.FaEye
                            onClick={() => setNewPassShow(!newPassShow)}
                            className="cursor-pointer text-xl absolute right-3 top-3"
                          />
                        )}
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                          <fontAwesome.FaLock className="dark:text-gray-500 text-gray-400" />
                        </div>

                        <input
                          onChange={newPasswordFormik.handleChange}
                          onBlur={newPasswordFormik.handleBlur}
                          value={newPasswordFormik.values.password}
                          className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          type={newPassShow ? "text" : "password"}
                          placeholder="New Password"
                          name="password"
                          id="password"
                          autoComplete="true"
                        />
                      </div>
                      {newPasswordFormik.errors.password &&
                      newPasswordFormik.touched.password ? (
                        <>
                          <fontAwesome.FaExclamationCircle
                            className={`${
                              newPasswordFormik.errors.password &&
                              newPasswordFormik.touched.password
                                ? "shake"
                                : null
                            } absolute top-11 right-4 text-red-800  dark:text-red-400 text-xl`}
                          />
                          <div
                            className="flex items-center p-4 mt-2 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                            role="alert"
                          >
                            <fontAwesome.FaExclamationCircle className="text-xl mr-2" />

                            {newPasswordFormik.errors.password}
                          </div>
                        </>
                      ) : null}
                    </div>
                    <div className="new-pass2 ">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Confirm New Password
                      </label>
                      <div className="relative mt-3">
                        {confirmPassShow ? (
                          <fontAwesome.FaEyeSlash
                            onClick={() => setConfirmPassShow(!confirmPassShow)}
                            className="cursor-pointer text-xl absolute right-3 top-3"
                          />
                        ) : (
                          <fontAwesome.FaEye
                            onClick={() => setConfirmPassShow(!confirmPassShow)}
                            className="cursor-pointer text-xl absolute right-3 top-3"
                          />
                        )}
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                          <fontAwesome.FaLock className="dark:text-gray-500 text-gray-400" />
                        </div>

                        <input
                          onChange={newPasswordFormik.handleChange}
                          onBlur={newPasswordFormik.handleBlur}
                          value={newPasswordFormik.values.rePassword}
                          className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          type={confirmPassShow ? "text" : "password"}
                          placeholder="Confirm New Password"
                          name="rePassword"
                          id="rePassword"
                          autoComplete="true"
                        />
                      </div>
                      {newPasswordFormik.errors.rePassword &&
                      newPasswordFormik.touched.rePassword ? (
                        <>
                          <fontAwesome.FaExclamationCircle
                            className={`${
                              newPasswordFormik.errors.rePassword &&
                              newPasswordFormik.touched.rePassword
                                ? "shake"
                                : null
                            } absolute top-11 right-4 text-red-800  dark:text-red-400 text-xl`}
                          />
                          <div
                            className="flex items-center p-4 mt-2 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                            role="alert"
                          >
                            <fontAwesome.FaExclamationCircle className="text-xl mr-2" />
                            <p className="font-medium">
                              {newPasswordFormik.errors.rePassword}
                            </p>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>

                  {newPasswordError && (
                    <div
                      className="flex items-center justify-center p-4 mt-2 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                      role="alert"
                    >
                      <fontAwesome.FaExclamationCircle className="text-xl mr-2 fa-beat" />
                      <p className="font-medium">{newPasswordError}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={
                      !(newPasswordFormik.isValid && newPasswordFormik.dirty) ||
                      (saveLoading && valueLoader == "pass")
                    }
                    className="disabled:cursor-not-allowed disabled:hover:shadow-none disabled:bg-blue-950 disabled:text-slate-500 disabled:shadow-none mt-3 shadow-2xl transition-all duration-300 hover:shadow-blue-700 group relative overflow-hidden bg-blue-600 focus:ring-4 focus:ring-blue-300 inline-flex items-center px-7 py-2.5 rounded-lg text-white justify-center"
                  >
                    {saveLoading && valueLoader == "pass" ? (
                      <fontAwesome.FaSpinner className="animate-spin" />
                    ) : (
                      <span className="z-40 flex items-center font-bold">
                        <fontAwesome.FaSave className="text-xl me-2" /> Save New
                        Password
                      </span>
                    )}

                    <div className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 group-disabled:group-hover:translate-x-[-70%] group-hover:translate-x-[50%] z-20 duration-1000"></div>
                  </button>
                </form>
              </motion.div>
            </Tabs.Item>
          </Tabs>
        </section>
      </div>
    </>
  );
}

{
  /*  */
}
