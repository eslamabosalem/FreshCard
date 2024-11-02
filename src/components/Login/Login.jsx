import React, { useContext, useEffect, useState } from "react";
import * as fontAwesome from "react-icons/fa"; //fontawesome icons
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Label, TextInput } from "flowbite-react";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext/UserContext.jsx";
import MainLoading from "../MainLoading/MainLoading.jsx";
import { Helmet } from "react-helmet";

export default function Login() {
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);

  const formValidation = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email Is Required"),
    password: Yup.string()
      .min(8)
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/,
        "Wrong Password, it doesn't match the conditions"
      )
      .required("Password Is Requierd"),
  });

  const [resError, setResError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUserLogin, setUserName, setUserEmail } = useContext(UserContext);

  async function formSubmit(values) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        values
      );

      if (data.message == `success`) {
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
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
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
        <title>Fresh Cart</title>
      </Helmet>
      <>
        <section className="dark:bg-zinc-900 min-h-screen py-24 flex items-center bg-zinc-50">
          <div className="container">
            <form
              className="max-w-lg m-auto flex flex-col pt-32 gap-3 dark:text-white relative"
              onSubmit={formik.handleSubmit}
            >
              <h2
                className={`text-2xl relative  w-fit font-extrabold dark:text-slate-100 text-gray-800`}
              >
                Welcome! So good to have you back!
              </h2>
              <h2 className="text-blue-700 font-bold text-4xl mb-3 animate__shakeX">
                Login Now
              </h2>
              <div className="relative">
                <div className="mb-2 block">
                  <Label
                    color={
                      formik.errors.email && formik.touched.email
                        ? "failure"
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
                      : "gray"
                  }
                  id="email"
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  icon={fontAwesome.FaEnvelope}
                  placeholder="Enter Email"
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
              </div>
              <div className="relative">
                {showPass ? (
                  <fontAwesome.FaEyeSlash
                    onClick={() => setShowPass(!showPass)}
                    className="cursor-pointer text-xl absolute right-10 top-11 z-30"
                  />
                ) : (
                  <fontAwesome.FaEye
                    onClick={() => setShowPass(!showPass)}
                    className="cursor-pointer text-xl absolute right-10 top-11 z-30"
                  />
                )}

                <div className="mb-2 block">
                  <Label
                    htmlFor="password"
                    color={
                      formik.errors.password && formik.touched.password
                        ? "failure"
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
                      className="flex items-center p-4 mt-2 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                      role="alert"
                    >
                      <fontAwesome.FaExclamationCircle className="text-xl mr-2" />
                      <p className="font-medium">{formik.errors.password}</p>
                    </div>
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

              <div className="flex items-center justify-between flex-wrap">
                <button
                  type="submit"
                  disabled={!(formik.isValid && formik.dirty)}
                  className="disabled:cursor-not-allowed disabled:hover:shadow-none disabled:bg-blue-950 disabled:text-slate-500 disabled:shadow-none w-full mt-2 shadow-2xl transition-all duration-300 hover:shadow-blue-700 group relative overflow-hidden bg-blue-600 focus:ring-4 focus:ring-blue-300 inline-flex items-center px-7 py-2.5 rounded-lg text-white justify-center"
                >
                  <span className="z-40 flex items-center font-bold">
                    Login
                  </span>

                  <div className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 group-disabled:group-hover:translate-x-[-70%] group-hover:translate-x-[50%] z-20 duration-1000"></div>
                </button>

                <p className="mt-3">
                  Not a member yet ?{" "}
                  <Link
                    to={"/signup"}
                    className="font-bold text-blue-700 hover:underline"
                  >
                    Create Account
                  </Link>
                </p>
                <Link
                  to={"/forgotPassword"}
                  className="block hover:underline  mt-3"
                >
                  forgot your password?
                </Link>
              </div>
            </form>
          </div>
        </section>
      </>
    </>
  );
}
