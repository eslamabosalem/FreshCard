import { FaTimes, FaUserPlus } from "react-icons/fa";
import { VscSignIn } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function AccessModal({ place, setOpenModal }) {
  return (
    <div className="fixed z-50 flex items-center inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 ">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 0.3,
        }}
        className="relative mx-auto shadow-xl rounded-md bg-white  dark:bg-gray-700 max-w-md"
      >
        <div className="flex justify-end p-2">
          <FaTimes
            onClick={() => setOpenModal(false)}
            className="text-xl cursor-pointer"
          />
        </div>
        <div className="p-6 pt-0 text-center">
          <h3 className="mb-5 text-lg font-normal ">
            To add a product to your {place ?? ""}, you must login first
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            if you {"don't"} have an account you can register now
          </p>
          <div className="flex items-center flex-wrap justify-center gap-3 mt-4">
            <Link
              onClick={() => scrollTo(0, 0)}
              to={"/login"}
              className="group mt-2 relative overflow-hidden bg-green-700 focus:ring-4 focus:ring-green-300 inline-flex items-center px-3 sm:px-7 py-2.5 rounded-lg text-white justify-center"
            >
              <span className="z-40 flex items-center">
                <VscSignIn className="me-2 text-xl" />
                {"Login "}
              </span>
              <div className="absolute inset-0 h-[200%] w-[200%] rotate-[50deg] translate-x-[-90%] transition-all group-hover:scale-100 bg-white/30 group-hover:translate-x-[55%] z-20 duration-1000"></div>
            </Link>
            <Link
              onClick={() => scrollTo(0, 0)}
              to={"/signup"}
              className="group mt-2 relative overflow-hidden bg-blue-700 focus:ring-4 focus:ring-orange-300 inline-flex items-center px-7 py-2.5 rounded-lg text-white justify-center"
            >
              <span className="z-40 flex items-center">
                <FaUserPlus className="me-2 text-xl" />
                {"SignUp"}
              </span>
              <div className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-75%] transition-all group-hover:scale-100 bg-white/30 group-hover:translate-x-[50%] z-20 duration-1000"></div>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
