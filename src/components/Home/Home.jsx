import React, { useRef } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import saleImg from "../../assets/imgs/discountBg.jpg";
import MainLoading from "../MainLoading/MainLoading";
import useAllProducts from "../../Hooks/AllProducts/useAllProducts";
import Title from "../Title/Title";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import HomeSlider from "../HomeSlider/HomeSlider";
import ElectronicSlider from "../ElectronicSlider/ElectronicSlider";
import BrandsSlider from "../BrandsSlider/BrandsSlider";
import NewsLetter from "../NewsLetter/NewsLetter";
import WhyUs from "../WhyUs/WhyUs";

const imgs = Object.values(
  import.meta.glob(
    "../../assets/imgs/categoriesCards/*.{png,jpg,jpeg,PNG,JPEG}",
    {
      eager: true,
      as: "url",
    }
  )
);

export default function Home() {
  const { isLoading } = useAllProducts();

  const bestCategoriesRef = useRef(null);

  if (isLoading) {
    return <MainLoading />;
  }

  return (
    <>
      <div className="overflow-x-hidden">
        <Helmet>
          <title>Home</title>
        </Helmet>
        {/* main slider*/}
        <div className="relative">
          <HomeSlider />
          <div
            onClick={() => {
              bestCategoriesRef.current.scrollIntoView({ behavior: "smooth" });
            }}
            className="scrolldown hidden lg:block absolute bottom-5 xl:bottom-20 2xl:bottom-52 4xl:bottom-20 left-1/2 -translate-x-1/2  z-30"
          >
            <div className="chevrons">
              <div className="chevrondown" />
              <div className="chevrondown" />
            </div>
          </div>
        </div>

        {/* best categories */}
        <div ref={bestCategoriesRef} className="container ">
          <section className="pt-20 xl:px-44">
            <Title title={"Best Categories"} my={"my-8"} mx={"mx-auto"} />
            <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-2 gap-14 sm:gap-8 justify-items-center">
              {/* man */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: -100,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.9 },
                }}
              >
                <Link
                  onClick={() => scrollTo(0, 0)}
                  to={`/Men's Fashion/Products/6439d5b90049ad0b52b90048/category`}
                >
                  <div className="card group/card relative">
                    <div className="wrapper text-center relative group-hover/card:brightness-50 group-hover/card:shadow-2xl group-hover/card:shadow-black drop-shadow-2xl group-hover/card:[transform:perspective(900px)translateY(-5%)rotateX(35deg)translateZ(0)] transition-all duration-500">
                      <img
                        src={imgs[0]}
                        className="w-full "
                        alt="Men's Fashion"
                      />
                    </div>
                    <img
                      src={imgs[1]}
                      className="w-full opacity-0 group-hover/card:opacity-100 group-hover/card:-translate-y-11 transition-all duration-700 absolute inset-0"
                      alt=""
                    />
                    <span className="text-center block absolute left-0 right-0 mx-auto font-extrabold -bottom-0 group-hover/card:bottom-32 delay-200 text-white p-3 rounded-lg bg-black/65 w-fit text-2xl md:text-3xl lg:text-4xl opacity-0 group-hover/card:opacity-100 transition-all duration-700 ">
                      {"Men's Fashion"}
                    </span>
                  </div>
                </Link>
              </motion.div>

              {/* woman */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: 100,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.9 },
                  
                }}

              >
                <Link
                  onClick={() => scrollTo(0, 0)}
                  to={`/Women's Fashion/Products/6439d58a0049ad0b52b9003f/category`}
                >
                  <div className="card group/card relative">
                    <div className="wrapper relative group-hover/card:brightness-50 group-hover/card:shadow-2xl group-hover/card:shadow-black drop-shadow-2xl group-hover/card:[transform:perspective(900px)translateY(-5%)rotateX(35deg)translateZ(0)] transition-all duration-500">
                      <img
                        src={imgs[2]}
                        className="w-full "
                        alt="Men's Fashion"
                      />
                    </div>
                    <img
                      src={imgs[3]}
                      className="w-full opacity-0 group-hover/card:opacity-100 group-hover/card:-translate-y-11 transition-all duration-700 absolute inset-0"
                      alt=""
                    />
                    <span className="text-center block absolute left-0 right-0 mx-auto font-extrabold -bottom-0 group-hover/card:bottom-32 delay-200 text-white p-3 rounded-lg bg-black/65 w-fit text-2xl md:text-3xl lg:text-4xl opacity-0 group-hover/card:opacity-100 transition-all duration-700 ">
                      {"Women's Fashion"}
                    </span>
                  </div>
                </Link>
              </motion.div>
            </div>
          </section>
        </div>
        {/* sale section */}
        <section className="relative group/sec my-24">
          <div className="relative 4xl:container">
            <img
              src={saleImg}
              className="brightness-[0.4] xl:h-96 w-full group-hover/sec:brightness-90 transition-all duration-1000"
              alt=""
            />
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.3,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
                transition: { duration: 0.9 },

              }}
              viewport={{ once: true }}
              className="absolute container xl:pl-32 inset-0 sm:ml-32 justify-start sm:justify-center items-center flex flex-col gap-2 sm:gap-5 w-fit text-white"
            >
              <span className="text-white sm:pr-10 group-hover/sec:bg-red-800/80 transition-all duration-500 bg-red-800/40 p-2 rounded-se-full sub-font italic text-[4vw] lg:text-5xl">
                Hurry Up !{" "}
              </span>
              <span className="text-[4vw] text-gray-200 font-semibold lg:text-5xl">
                Hot Deals! Up to{" "}
                <span className="text-white group-hover/sec:bg-red-800/80  transition-all duration-500 bg-red-800/40 p-2 rounded-ss-full font-bold">
                  60% Off
                </span>
              </span>
              <Link to={"/saleProducts"} onClick={() => scrollTo(0, 0)}>
                <button className="btn text-xs sm:text-sm md:text-lg lg:text-xl px-2 py-1 sm:px-5 sm:py-3">
                  Shop Now!
                </button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ele slider */}
        <ElectronicSlider />

        {/* why shop with us */}
        <WhyUs />

        {/* brands slider */}
        <BrandsSlider />

        {/* newsletter */}
        <NewsLetter />
      </div>
    </>
  );
}
