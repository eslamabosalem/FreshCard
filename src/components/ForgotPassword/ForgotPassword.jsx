import React, { useState } from "react";
import "./ForgotPassword.css";
import * as fontAwesome from "react-icons/fa"; //fontawesome icons
import { TfiReload } from "react-icons/tfi";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HStack, PinInput, PinInputField } from "@chakra-ui/react";
import { Bounce, toast } from "react-toastify";
import { Tooltip } from "flowbite-react";
import { Helmet } from "react-helmet";
import { AnimatePresence, motion } from "framer-motion";

const xAni = {
  initial: { x: "-100vw" },
  animate: { x: 0 },
  exit: { x: "-100vw" },
};

export default function ForgotPassword() {
  function Error() {
    return (
      <>
        <div
          className="flex items-center p-4 mt-2 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
          role="alert"
        >
          <fontAwesome.FaExclamationCircle className="text-xl mr-2 fa-beat" />
          <p className="font-medium">{resError}</p>
        </div>
      </>
    );
  }

  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState(0);
  const [email, setEmail] = useState("");
  //
  const [emailForm, setEmailForm] = useState(true);
  const [codeForm, setCodeForm] = useState(false);
  const [resetForm, setResetForm] = useState(false);

  const [resError, setResError] = useState("");

  //email form
  const emailValidation = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email Is Required"),
  });
  const emailFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: emailValidation,
    onSubmit: emailSubmit,
  });
  //enter email to reset password
  async function emailSubmit(values) {
    setEmail(values.email);
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        {
          email: values.email,
        }
      );
      setResError(null);

      setIsLoading(false);
      if (data?.statusMsg == "success") {
        setEmailForm(false);
        setResetForm(false);
        setCodeForm(true);
      }
    } catch (error) {
      setIsLoading(false);
      setResError(error.response.data.message);
    }
  }

  // enter reset code
  async function codeSubmit(code) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        {
          resetCode: code,
        }
      );
      setResError(null);

      if (data.status == "Success") {
        setCodeForm(false);
        setEmailForm(false);
        setResetForm(true);
      }

      setIsLoading(false);
    } catch (error) {
      setResError(error.response.data.message);

      setIsLoading(false);
    }
  }

  //password form
  const passValidation = Yup.object().shape({
    newPassword: Yup.string()
      .min(8)
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
      .required("Password Is Requierd"),
  });

  const newPassFormik = useFormik({
    initialValues: {
      newPassword: "",
    },
    validationSchema: passValidation,
    onSubmit: newPassSubmit,
  });

  // enter new password
  async function newPassSubmit(values) {
    setIsLoading(true);
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        {
          email: email,
          newPassword: values.newPassword,
        }
      );
      setIsLoading(false);
      if (data["token"]) {
        toast.success("Password changed successfully", {
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
        navigate("/login");
      }
    } catch (error) {
      setIsLoading(false);
      setResError(error.response.data.message);
    }
  }

  return (
    <>
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>
      <>
        <section className="forget-section pt-20">
          <div className="container">
            <div className="flex flex-col items-center justify-center pb-24 mx-auto h-screen relative">
              <div className="back absolute top-6 right-6 flex justify-center">
                <Tooltip content="Back" className="w-20" placement="right">
                  <button
                    onClick={() => navigate(-1)}
                    className="rounded w-10 h-10 flex justify-center items-center hover:bg-blue-950 bg-blue-800 text-white hover:text-white relative transition-all duration-[0.3s] p-1 m-1 md:!mx-0 text-2xl"
                  >
                    <fontAwesome.FaArrowAltCircleRight />
                  </button>
                </Tooltip>
              </div>
              {/* Email */}
              <AnimatePresence mode="wait">
                {emailForm && (
                  <motion.div
                    variants={xAni}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{
                      duration: 0.7,
                      type: "spring",
                      mass: 0.5,
                      damping: 10,
                    }}
                    className="w-full p-4 absolute bg-slate-300 rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8"
                  >
                    <h1 className="mb-2 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Forgot your password?
                    </h1>
                    <p className=" text-gray-600 dark:text-gray-400">
                      {"Don't"} fret! Just type in your email and we will send
                      you a code to reset your password!
                    </p>

                    <form
                      onSubmit={emailFormik.handleSubmit}
                      className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
                      action="#"
                    >
                      <div>
                        <label
                          htmlFor="email-address-icon"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Enter Your Email
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <fontAwesome.FaEnvelope />
                          </div>
                          <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id="email"
                            value={emailFormik.values.email}
                            onBlur={emailFormik.handleBlur}
                            onChange={emailFormik.handleChange}
                            type="email"
                            placeholder="example@gmail.com"
                          />
                        </div>
                        {emailFormik.errors.email &&
                        emailFormik.touched.email ? (
                          <>
                            <div
                              className="flex items-center animate__shakeX p-4 mt-2 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                              role="alert"
                            >
                              <fontAwesome.FaExclamationCircle className="text-xl mr-2" />
                              <p className="font-medium">
                                {emailFormik.errors.email}
                              </p>
                            </div>
                          </>
                        ) : null}
                      </div>

                      {resError && <Error />}

                      <button
                        type="submit"
                        disabled={
                          !(emailFormik.isValid && emailFormik.dirty) ||
                          isLoading
                        }
                        className="disabled:cursor-not-allowed disabled:hover:shadow-none disabled:bg-blue-950 disabled:text-slate-500 disabled:shadow-none w-full mt-2 shadow-2xl transition-all duration-300 hover:shadow-blue-700 group relative overflow-hidden bg-blue-600 focus:ring-4 focus:ring-blue-300 inline-flex items-center px-7 py-2.5 rounded-lg text-white justify-center"
                      >
                        {isLoading ? (
                          <fontAwesome.FaSpinner className="animate-spin text-xl" />
                        ) : (
                          <span className="z-40 flex items-center font-bold">
                            <fontAwesome.FaKey className="me-2 text-xl" />
                            Send Code
                          </span>
                        )}
                        <div className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 group-disabled:group-hover:translate-x-[-70%] group-hover:translate-x-[50%] z-20 duration-1000"></div>
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Code */}
              <AnimatePresence mode="wait">
                {codeForm && (
                  <motion.div
                    variants={xAni}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{
                      delay: 0.7,
                      duration: 0.7,
                      type: "spring",
                      mass: 0.5,
                      damping: 10,
                    }}
                    className="w-full absolute p-4 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8"
                  >
                    <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Reset code sent to your email
                    </h1>

                    <form
                      onSubmit={(e) => e.preventDefault()}
                      className="mt-4 flex flex-col items-center justify-center space-y-4 lg:mt-5 md:space-y-5"
                    >
                      <div>
                        <label
                          htmlFor="email-address-icon"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Enter The Code
                        </label>

                        <HStack>
                          <PinInput
                            onComplete={(e) => codeSubmit(e)}
                            onChange={(e) => setCode(e)}
                            otp
                          >
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                          </PinInput>
                        </HStack>
                      </div>

                      {resError && <Error />}

                      <button
                        disabled={code.length < 5 || code == 0 || isLoading}
                        onClick={() => codeSubmit(code)}
                        className="disabled:cursor-not-allowed disabled:hover:shadow-none disabled:bg-blue-950 disabled:text-slate-500 disabled:shadow-none w-full mt-2 shadow-2xl transition-all duration-300 hover:shadow-blue-700 group relative overflow-hidden bg-blue-600 focus:ring-4 focus:ring-blue-300 inline-flex items-center px-7 py-2.5 rounded-lg text-white justify-center"
                      >
                        {isLoading ? (
                          <fontAwesome.FaSpinner className="animate-spin" />
                        ) : (
                          <span className="z-40 flex items-center font-bold">
                            <fontAwesome.FaCheckCircle className="me-2 text-xl" />
                            Confirm
                          </span>
                        )}
                        <div className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 group-disabled:group-hover:translate-x-[-70%] group-hover:translate-x-[50%] z-20 duration-1000"></div>
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
              {/* New Password */}
              <AnimatePresence mode="wait">
                {resetForm && (
                  <motion.div
                    variants={xAni}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{
                      delay: 0.7,
                      duration: 0.7,
                      type: "spring",
                      mass: 0.5,
                      damping: 10,
                    }}
                    className="w-full p-4 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8"
                  >
                    <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Enter Your New Password
                    </h1>

                    <form
                      onSubmit={newPassFormik.handleSubmit}
                      className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
                      action="#"
                    >
                      <div>
                        <div className="relative">
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <fontAwesome.FaEnvelope className="dark:text-gray-500 text-gray-400" />
                          </div>
                          <input
                            disabled
                            className="disabled:cursor-not-allowed dark:disabled:text-gray-400 disabled:text-gray-400 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={email}
                            type="email"
                            placeholder="example@gmail.com"
                            name="email"
                          />
                        </div>

                        <div className="relative mt-3">
                          {showPass ? (
                            <fontAwesome.FaEyeSlash
                              onClick={() => setShowPass(!showPass)}
                              className="cursor-pointer text-xl absolute right-3 top-3"
                            />
                          ) : (
                            <fontAwesome.FaEye
                              onClick={() => setShowPass(!showPass)}
                              className="cursor-pointer text-xl absolute right-3 top-3"
                            />
                          )}
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <fontAwesome.FaLock className="dark:text-gray-500 text-gray-400" />
                          </div>

                          <input
                            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={newPassFormik.values.newPassword}
                            onBlur={newPassFormik.handleBlur}
                            onChange={newPassFormik.handleChange}
                            type={showPass ? "text" : "password"}
                            placeholder="Enter your new password"
                            name="newPassword"
                            id="newPassword"
                            autoComplete="true"
                          />
                        </div>
                        {newPassFormik.errors.newPassword &&
                        newPassFormik.touched.newPassword ? (
                          <>
                            <div
                              className="flex items-center font-medium animate__shakeX p-4 mt-2 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                              role="alert"
                            >
                              <fontAwesome.FaExclamationCircle className="text-xl mr-2" />

                              {newPassFormik.errors.newPassword}
                            </div>
                          </>
                        ) : null}
                      </div>
                      {resError && <Error />}
                      <button
                        type="submit"
                        disabled={
                          !(newPassFormik.isValid && newPassFormik.dirty) ||
                          isLoading
                        }
                        className="disabled:cursor-not-allowed disabled:hover:shadow-none disabled:bg-blue-950 disabled:text-slate-500 disabled:shadow-none w-full mt-2 shadow-2xl transition-all duration-300 hover:shadow-blue-700 group relative overflow-hidden bg-blue-600 focus:ring-4 focus:ring-blue-300 inline-flex items-center px-7 py-2.5 rounded-lg text-white justify-center"
                      >
                        {isLoading ? (
                          <fontAwesome.FaSpinner className="animate-spin text-xl" />
                        ) : (
                          <span className="z-40 flex items-center font-bold">
                            <TfiReload className="me-2 text-xl" />
                            Change Password
                          </span>
                        )}
                        <div className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 group-disabled:group-hover:translate-x-[-70%] group-hover:translate-x-[50%] z-20 duration-1000"></div>
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </>
    </>
  );
}
