import React, { useContext, useEffect, useState } from "react";
import * as fontAwesome from "react-icons/fa"; //fontawesome icons
import { useFormik } from "formik";
import "./SignUp.css";
import FormStyle from "../newStyle.js";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Label, TextInput } from "flowbite-react";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext/UserContext.jsx";
import { Bounce, toast } from "react-toastify";
import { Helmet } from "react-helmet";
import MainLoading from "../MainLoading/MainLoading.jsx";

export default function SignUp() {
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const formValidation = Yup.object().shape({
    name: Yup.string()
      .min(3, "minimum length is 3 characters")
      .max(20, "maximum length is 20 characters")
      .required("User Name Is Required"),
    email: Yup.string().email("Invalid email").required("Email Is Required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Phone Number Must Be Egyptian")
      .required("Phone Number Is Required"),
    password: Yup.string()
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
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password not matched")
      .required("Please Confirm Your Password"),
  });

  const [resError, setResError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    userLogin,
    setUserLogin,
    userName,
    setUserName,
    userEmail,
    setUserEmail,
  } = useContext(UserContext);
  async function formSubmit(values) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      );
      if (data.message == `success`) {
        toast.success("Registration has been completed successfully", {
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
        setUserName(data.user.name);
        setUserEmail(data.user.email);
        setUserLogin(data.token);
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("userEmail", data.user.email);
        navigate("/");
        window.scrollTo(0, 0);
      }
      setIsLoading(false);
    } catch (error) {
      setResError(error?.response?.data?.message);
      setIsLoading(false);
      if (error?.response?.data?.message == "Account Already Exists") {
        formik.setErrors({
          email: "Please enter different email",
        });
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: formValidation,
    onSubmit: formSubmit,
  });

  useEffect(() => {
    formik.validateForm();
  }, []);

  if (isLoading) {
    return <MainLoading />;
  }

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <>
        <section className="min-h-screen flex items-center py-24 dark:bg-zinc-900 bg-zinc-50">
          <div className="container pt-12 h-full">
            <form
              className="max-w-lg mx-auto sm:p-4 flex flex-col gap-3"
              onSubmit={formik.handleSubmit}
            >
              <h2 className="text-blue-700 font-bold text-4xl mb-3 animate__shakeX">
                Register Now
              </h2>

              <div className="relative">
                <div className="mb-2 block">
                  <Label
                    color={
                      formik.errors.name && formik.touched.name
                        ? "failure"
                        : !formik.errors.name && formik.touched.name
                        ? "success"
                        : "gray"
                    }
                    htmlFor="name"
                    value="Your Name"
                  />
                </div>
                <TextInput
                  className={
                    formik.errors.name && formik.touched.name ? "shake" : null
                  }
                  id="name"
                  color={
                    formik.errors.name && formik.touched.name
                      ? "failure"
                      : !formik.errors.name && formik.touched.name
                      ? "success"
                      : "gray"
                  }
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  icon={fontAwesome.FaUser}
                  placeholder="User Name"
                />

                {formik.errors.name && formik.touched.name ? (
                  <>
                    <fontAwesome.FaExclamationCircle
                      className={`${
                        formik.errors.name && formik.touched.name
                          ? "shake"
                          : null
                      } absolute top-11 right-4 text-red-800  dark:text-red-400 text-xl`}
                    />
                    <div
                      className="flex items-center p-4 mt-2 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                      role="alert"
                    >
                      <fontAwesome.FaExclamationCircle className="text-xl mr-2" />
                      <p className="font-medium">{formik.errors.name}</p>
                    </div>
                  </>
                ) : null}
                {!formik.errors.name && formik.touched.name ? (
                  <>
                    <fontAwesome.FaCheck className="absolute top-11 right-4 text-green-800  dark:text-green-400 text-xl" />
                  </>
                ) : null}
              </div>

              <div className="relative">
                <div className="mb-2 block">
                  <Label
                    color={
                      formik.errors.email && formik.touched.email
                        ? "failure"
                        : !formik.errors.email && formik.touched.email
                        ? "success"
                        : "gray"
                    }
                    htmlFor="email"
                    value="Your email"
                  />
                </div>
                <TextInput
                  className={
                    formik.errors.email && formik.touched.email ? "shake" : null
                  }
                  color={
                    formik.errors.email && formik.touched.email
                      ? "failure"
                      : !formik.errors.email && formik.touched.email
                      ? "success"
                      : "gray"
                  }
                  id="email"
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  icon={fontAwesome.FaEnvelope}
                  placeholder="example@gmail.com"
                />
                {formik.errors.email && formik.touched.email ? (
                  <>
                    <fontAwesome.FaExclamationCircle
                      className={`${
                        formik.errors.email && formik.touched.email
                          ? "shake"
                          : null
                      } absolute top-11 right-4 text-red-800  dark:text-red-400 text-xl`}
                    />
                    <div
                      className="flex items-center animate__shakeX p-4 mt-2 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                      role="alert"
                    >
                      <fontAwesome.FaExclamationCircle className="text-xl mr-2" />
                      <p className="font-medium">{formik.errors.email}</p>
                    </div>
                  </>
                ) : null}
                {!formik.errors.email && formik.touched.email ? (
                  <>
                    <fontAwesome.FaCheck className="absolute top-11 right-4 text-green-800  dark:text-green-400 text-xl" />
                  </>
                ) : null}
              </div>

              <div className="relative">
                <div className="mb-2 block">
                  <Label
                    color={
                      formik.errors.phone && formik.touched.phone
                        ? "failure"
                        : !formik.errors.phone && formik.touched.phone
                        ? "success"
                        : "gray"
                    }
                    htmlFor="phone"
                    value="Your phone"
                  />
                </div>
                <TextInput
                  className={
                    formik.errors.phone && formik.touched.phone ? "shake" : null
                  }
                  color={
                    formik.errors.phone && formik.touched.phone
                      ? "failure"
                      : !formik.errors.phone && formik.touched.phone
                      ? "success"
                      : "gray"
                  }
                  id="phone"
                  value={formik.values.phone}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="tel"
                  icon={fontAwesome.FaPhoneAlt}
                  placeholder="Phone number (123-456-7890)"
                />

                {formik.errors.phone && formik.touched.phone ? (
                  <>
                    <fontAwesome.FaExclamationCircle
                      className={`${
                        formik.errors.phone && formik.touched.phone
                          ? "shake"
                          : null
                      } absolute top-11 right-4 text-red-800  dark:text-red-400 text-xl`}
                    />
                    <div
                      className="flex items-center p-4 mt-2 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                      role="alert"
                    >
                      <fontAwesome.FaExclamationCircle className="text-xl mr-2" />
                      <p className="font-medium">{formik.errors.phone}</p>
                    </div>
                  </>
                ) : null}
                {!formik.errors.phone && formik.touched.phone ? (
                  <>
                    <fontAwesome.FaCheck className="absolute top-11 right-4 text-green-800  dark:text-green-400 text-xl" />
                  </>
                ) : null}
              </div>

              <div className="relative">
                {showPass ? (
                  <fontAwesome.FaEyeSlash
                    onClick={() => setShowPass(!showPass)}
                    className="cursor-pointer text-xl absolute right-11 top-11 z-30"
                  />
                ) : (
                  <fontAwesome.FaEye
                    onClick={() => setShowPass(!showPass)}
                    className="cursor-pointer text-xl absolute right-11 top-11 z-30"
                  />
                )}
                <div className="mb-2 block">
                  <Label
                    htmlFor="password"
                    color={
                      formik.errors.password && formik.touched.password
                        ? "failure"
                        : !formik.errors.password && formik.touched.password
                        ? "success"
                        : "gray"
                    }
                    value="Your password"
                  />
                </div>
                <TextInput
                  className={
                    formik.errors.password && formik.touched.password
                      ? "shake"
                      : null
                  }
                  autoComplete="true"
                  color={
                    formik.errors.password && formik.touched.password
                      ? "failure"
                      : !formik.errors.password && formik.touched.password
                      ? "success"
                      : "gray"
                  }
                  id="password"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type={showPass ? "text" : "password"}
                  icon={fontAwesome.FaLock}
                  placeholder="Password"
                />

                {formik.errors.password && formik.touched.password ? (
                  <>
                    <fontAwesome.FaExclamationCircle
                      className={`${
                        formik.errors.password && formik.touched.password
                          ? "shake"
                          : null
                      } absolute top-11 right-4 text-red-800  dark:text-red-400 text-xl`}
                    />
                    <div
                      className="flex items-center font-medium p-4 mt-2 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                      role="alert"
                    >
                      <fontAwesome.FaExclamationCircle className="text-xl mr-2" />

                      {formik.errors.password}
                    </div>
                  </>
                ) : null}
                {!formik.errors.password && formik.touched.password ? (
                  <>
                    <fontAwesome.FaCheck className="absolute top-11 right-4 text-green-800  dark:text-green-400 text-xl" />
                  </>
                ) : null}
              </div>

              <div className="relative">
                <div className="mb-2 block">
                  <Label
                    htmlFor="rePassword"
                    color={
                      formik.errors.rePassword && formik.touched.rePassword
                        ? "failure"
                        : !formik.errors.rePassword && formik.touched.rePassword
                        ? "success"
                        : "gray"
                    }
                    value="Confirm Password"
                  />
                </div>
                <TextInput
                  className={
                    formik.errors.rePassword && formik.touched.rePassword
                      ? "shake"
                      : null
                  }
                  autoComplete="true"
                  color={
                    formik.errors.rePassword && formik.touched.rePassword
                      ? "failure"
                      : !formik.errors.rePassword && formik.touched.rePassword
                      ? "success"
                      : "gray"
                  }
                  id="rePassword"
                  value={formik.values.rePassword}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type={showPass ? "text" : "password"}
                  icon={fontAwesome.FaLock}
                  placeholder="Confirm Password"
                />

                {formik.errors.rePassword && formik.touched.rePassword ? (
                  <>
                    <fontAwesome.FaExclamationCircle
                      className={`${
                        formik.errors.rePassword && formik.touched.rePassword
                          ? "shake"
                          : null
                      } absolute top-11 right-4 text-red-800  dark:text-red-400 text-xl`}
                    />
                    <div
                      className="flex items-center p-4 mt-2 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                      role="alert"
                    >
                      <fontAwesome.FaExclamationCircle className="text-xl mr-2" />
                      <p className="font-medium">{formik.errors.rePassword}</p>
                    </div>
                  </>
                ) : null}
                {!formik.errors.rePassword && formik.touched.rePassword ? (
                  <>
                    <fontAwesome.FaCheck className="absolute top-11 right-4 text-green-800  dark:text-green-400 text-xl" />
                  </>
                ) : null}
              </div>

              {resError && (
                <>
                  <div
                    className="shake flex items-center p-4 mt-2 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                    role="alert"
                  >
                    <fontAwesome.FaExclamationCircle className="text-xl mr-2 fa-beat" />
                    <p className="font-medium">{resError}</p>
                  </div>
                </>
              )}

              <div className="flex items-center flex-wrap">
                <button
                  type="submit"
                  disabled={!(formik.isValid && formik.dirty)}
                  className={FormStyle.submitStyle}
                >
                  Register
                </button>
                <p className="pl-5 mt-3">
                  Already a member ?{" "}
                  <Link
                    to={"/login"}
                    className="font-bold text-blue-700 hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </section>
      </>
    </>
  );
}
