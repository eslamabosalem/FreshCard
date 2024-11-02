import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as fontAwesome from "react-icons/fa"; //fontawesome icons
import { VscSignIn } from "react-icons/vsc";
import { Helmet } from "react-helmet";

export default function NoAccess() {
  const navigate = useNavigate();
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);
  return (
    <>
      <Helmet>
        <title>Login First</title>
      </Helmet>
      <div className="relative h-screen w-full flex items-center justify-center bg-cover bg-center text-center px-5">
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-gray-900 opacity-75" />
        <div className="z-30 flex flex-col justify-center text-white w-full h-screen">
          <h1 className="text-5xl mb-3 font-black">
            You need to login first to access this content
          </h1>

          <div className="flex flex-col items-center my-5">
            <p>if you {"don't"} have an account you can register now</p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center flex-wrap justify-center gap-3 mt-4">
                <Link
                  to={"/login"}
                  className="group mt-2 relative overflow-hidden bg-blue-700 focus:ring-4 focus:ring-blue-300 inline-flex items-center px-3 sm:px-7 py-2.5 rounded-lg text-white justify-center"
                >
                  <span className="z-40 flex items-center">
                    <VscSignIn className="me-2 text-xl" />
                    {"Login "}
                  </span>
                  <div className="absolute inset-0 h-[200%] w-[200%] rotate-[50deg] translate-x-[-90%] transition-all group-hover:scale-100 bg-white/30 group-hover:translate-x-[55%] z-20 duration-1000"></div>
                </Link>
                <Link
                  to={"/signup"}
                  className="group mt-2 relative overflow-hidden bg-green-700 focus:ring-4 focus:ring-green-300 inline-flex items-center px-7 py-2.5 rounded-lg text-white justify-center"
                >
                  <span className="z-40 flex items-center">
                    <fontAwesome.FaUserPlus className="me-2 text-xl" />
                    {"SignUp"}
                  </span>
                  <div className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-75%] transition-all group-hover:scale-100 bg-white/30 group-hover:translate-x-[50%] z-20 duration-1000"></div>
                </Link>
              </div>
              <span className="text-2xl font-bold">OR</span>
              <button
                onClick={() => navigate("/")}
                className="group mt-2 relative overflow-hidden bg-orange-700 focus:ring-4 focus:ring-orange-300 inline-flex items-center px-3 sm:px-7 py-2.5 rounded-lg text-white justify-center"
              >
                <span className="z-40 flex items-center">
                  <fontAwesome.FaHome className="me-2 text-xl" />
                  {"Go To Home Page"}
                </span>
                <div className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 group-hover:translate-x-[50%] z-20 duration-1000"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
