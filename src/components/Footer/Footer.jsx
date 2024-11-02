import * as fontAwesome from "react-icons/fa"; //fontawesome icons
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function Footer() {
  return (
    <>
      <div className="w-svw [box-shadow:_0_0_20px_1px_#1a56db] bg-white/70 dark:bg-black/70">
        <footer className=" container relative overflow-hidden">
          <div className="px-6 py-12 mx-auto">
            <div className="md:flex md:-mx-3 md:items-center md:justify-between">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-2 flex-wrap w-full"
              >
                <label>Get the fresh cart app</label>
                <p className="text-gray-500">
                  we will send you a link , open it and download the app
                </p>
                <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                      <fontAwesome.FaEnvelope />
                    </div>
                    <input
                      type="text"
                      className=" bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter your email"
                    />
                  </div>
                  <button
                    type="button"
                    className="disabled:cursor-not-allowed whitespace-nowrap px-6 py-2.5 group relative overflow-hidden bg-blue-700 focus:ring-4 focus:ring-blue-300 inline-flex items-center rounded-lg text-white justify-center"
                  >
                    <span className=" flex items-center">get link</span>
                    <div className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-80%] transition-all group-hover:scale-100 bg-white/30 group-hover:translate-x-[55%] z-20 duration-1000"></div>
                  </button>
                </div>
              </form>
            </div>
            <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div>
                <p className="font-semibold text-gray-800 dark:text-white">
                  Quick Link
                </p>
                <div className="flex flex-col items-start mt-5 space-y-2">
                  <a
                    href="#"
                    className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
                  >
                    Home
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
                  >
                    Who We Are
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
                  >
                    Our Philosophy
                  </a>
                </div>
              </div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-white">
                  Industries
                </p>
                <div className="flex flex-col items-start mt-5 space-y-2">
                  <a
                    href="#"
                    className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
                  >
                    Retail &amp; E-Commerce
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
                  >
                    Information Technology
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
                  >
                    Finance &amp; Insurance
                  </a>
                </div>
              </div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-white">
                  Services
                </p>
                <div className="flex flex-col items-start mt-5 space-y-2">
                  <a
                    href="#"
                    className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
                  >
                    Translation
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
                  >
                    Proofreading &amp; Editing
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
                  >
                    Content Creation
                  </a>
                </div>
              </div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-white">
                  Contact Us
                </p>
                <div className="flex flex-col items-start mt-5 space-y-2">
                  <a
                    href="#"
                    className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
                  >
                    +880 768 473 4978
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
                  >
                    info@freshCart.com
                  </a>
                </div>
              </div>
            </div>
            <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />
            <div className="flex flex-col gap-4 md:gap-0 items-center justify-between md:flex-row">
              <div className="payCards flex items-center">
                <span>Payment Partners</span>
                <img
                  src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png"
                  className="h-6 ml-2"
                />
                <img
                  src="https://www.sketchappsources.com/resources/source-image/PayPalCard.png"
                  className="h-6 ml-1"
                />
              </div>
              <div className="storesApps flex gap-2 flex-wrap">
                <button className="inline-flex w-full items-center justify-center rounded-lg bg-gray-800 px-4 py-2.5 text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-800 sm:w-auto">
                  <svg
                    className="mr-3 h-7 w-7"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="google-play"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"
                    />
                  </svg>
                  <div className="text-left">
                    <div className="mb-1 text-xs">Download on the</div>
                    <div className="-mt-1 font-sans text-sm font-semibold">
                      Google Play
                    </div>
                  </div>
                </button>
                <button className="inline-flex w-full items-center justify-center rounded-lg bg-gray-800 px-4 py-2.5 text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-800 sm:w-auto">
                  <svg
                    className="mr-3 h-7 w-7"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="apple"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path
                      fill="currentColor"
                      d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                    />
                  </svg>
                  <div className="text-left">
                    <div className="mb-1 text-xs">Download on the</div>
                    <div className="-mt-1 font-sans text-sm font-semibold">
                      Mac App Store
                    </div>
                  </div>
                </button>
              </div>
            </div>
            <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />
            <div className="flex flex-col items-center justify-between lg:px-16 sm:flex-row">
              <Link
                className="flex items-center gap-2"
                to={"/"}
                onClick={() => scrollTo(0, 0)}
              >
                <img className="w-auto h-7" src={logo} />
                <span className="font-bold">Fresh Cart</span>
              </Link>
              <p className="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-300">
                © Copyright 2024 All Rights Reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
