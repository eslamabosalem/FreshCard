import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import NavBar from "../Navbar/Navbar";
import TopArrow from "../TopArrow/TopArrow";
import { AnimatePresence, motion } from "framer-motion";

export default function Layout() {
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY);
    });
  }, []);

  return (
    <>
      <NavBar />

      <div className="min-h-screen">
        <div className="fixed inset-0 w-full bg-blue-700/45 dark:bg-blue-700/25 -z-10 skew-y-12 rotate-45 translate-y-1/2 translate-x-1/2"></div>
        <AnimatePresence>
          {scroll > 300 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: "linear",
              }}
            >
              <TopArrow />
            </motion.div>
          )}
        </AnimatePresence>

        <Outlet />
      </div>

      <Footer />
    </>
  );
}
