import { Link } from "react-router-dom";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import manSlider from "../../assets/imgs/manslider.jpg";
import womanSlider from "../../assets/imgs/womanslider.png";
import eleSlider from "../../assets/imgs/33.jpg";
import "./HomeSlider.css";

export default function HomeSlider() {
  return (
    <section className="w-full main-slider 4xl:container pt-20 relative">
      <Swiper
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        spaceBetween={30}
        speed={800}
        navigation={true}
        modules={[EffectFade, Navigation, Autoplay]}
        className="text-white "
      >
        <SwiperSlide className="">
          <div className="relative w-full">
            <img
              className="brightness-50 block mx-auto"
              src={eleSlider}
              alt="electronics"
            />
            <div className="absolute top-1/2 -translate-y-1/2 xl:-translate-y-3/4 4xl:-translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col gap-0 sm:gap-4 text-center items-center justify-center">
              <p className="text-[4vw] lg:text-5xl M-font sm:space-y-3 p-1">
                <span
                  className="inline-block bg-black/50 p-1 sm:p-3 rounded"
                  style={{ animationDelay: "0.5s" }}
                >
                  power up your world
                </span>

                <span
                  className="inline-block bg-black/50 p-1 sm:p-3 rounded"
                  style={{ animationDelay: "0.7s" }}
                >
                  with mega sale up to{" "}
                  <span className="text-red-500">25% </span>
                  off
                </span>
              </p>
              <Link
                style={{ animationDelay: "0.9s" }}
                className="block w-full md:w-3/6"
                to={`/Electronics/Products/6439d2d167d9aa4ca970649f/category`}
              >
                <button className="w-full relative  h-7 sm:h-12 active:scale-95 transistion overflow-hidden rounded-lg p-[1px] focus:outline-none">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e7029a_0%,#f472b6_50%,#bd5fff_100%)]"></span>
                  <span className="inline-flex h-full w-full font-bold cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm text-white backdrop-blur-3xl gap-2 undefined">
                    Shop Now
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="">
          <div className="relative w-fit mx-auto">
            <img
              className="brightness-75 block mx-auto"
              src={manSlider}
              alt="men Fashion"
            />
            <div className="w-3/4 absolute top-1/2 -translate-y-1/2 2xl:-translate-y-3/4 4xl:-translate-y-1/2 -translate-x-1/2 left-1/2 sm:left-[45%] flex flex-col gap-1 text-center md:text-start items-start justify-center">
              <h3
                style={{ animationDelay: "0.5s" }}
                className="text-[5vw] lg:text-5xl font-extrabold italic w-full lg:w-3/4 text-blue-600 sub-font"
              >
                Your Style !
              </h3>
              <p className="lg:space-y-5 text-[4vw] lg:text-5xl w-full lg:w-3/4 M-font whitespace-break-spaces leading-relaxed tracking-wider sm:p-3">
                <span
                  className="inline-block leading-snug"
                  style={{ animationDelay: "0.7s" }}
                >
                  Choose the lifestyle
                </span>
                <span
                  className="inline-block"
                  style={{ animationDelay: "0.7s" }}
                >
                  you will lead
                </span>
                <span
                  className="inline-block leading-snug sm:leading-relaxed"
                  style={{ animationDelay: "0.9s" }}
                >
                  with awesome collection of men fashion
                </span>
              </p>
              <Link
                style={{ animationDelay: "0.9s" }}
                className="block w-full md:w-3/6"
                to={`/Men's Fashion/Products/6439d5b90049ad0b52b90048/category`}
              >
                <button className="w-full relative  h-7 sm:h-12 active:scale-95 transistion overflow-hidden rounded-lg p-[1px] focus:outline-none">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e7029a_0%,#f472b6_50%,#bd5fff_100%)]"></span>
                  <span className="inline-flex h-full w-full font-bold cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm text-white backdrop-blur-3xl gap-2 undefined">
                    Discover Now
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="">
          <div className="relative w-fit mx-auto">
            <img
              className="brightness-75 block mx-auto"
              src={womanSlider}
              alt="woman Fashion"
            />
            <div className="w-3/4 absolute top-1/2 -translate-y-1/2 xl:-translate-y-3/4 4xl:-translate-y-1/2 translate-x-1/2 right-1/2 sm:pe-10 sm:right-1/3 flex flex-col gap-1 text-center items-center justify-center">
              <h3
                style={{ animationDelay: "0.5s" }}
                className="bg-black/50 sm:bg-transparent text-[5vw] w-fit lg:text-5xl font-extrabold italic lg:w-3/4 text-blue-600 sub-font"
              >
                Summer Collection
              </h3>
              <p className="lg:space-y-5  text-[4vw] lg:text-5xl lg:w-3/4 M-font whitespace-break-spaces leading-relaxed tracking-wider sm:p-3">
                <span
                  className="inline-block leading-snug bg-black/50 sm:bg-transparent p-1"
                  style={{ animationDelay: "0.7s" }}
                >
                  sustainable fashion wear
                </span>
                <span
                  className="inline-block bg-black/50 sm:bg-transparent p-1"
                  style={{ animationDelay: "0.9s" }}
                >
                  with Special Offers
                </span>
              </p>
              <Link
                style={{ animationDelay: "1s" }}
                className="block w-full md:w-3/6"
                to={`/Women's Fashion/Products/6439d58a0049ad0b52b9003f/category`}
              >
                <button className="w-full relative  h-7 sm:h-12 active:scale-95 transistion overflow-hidden rounded-lg p-[1px] focus:outline-none">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e7029a_0%,#f472b6_50%,#bd5fff_100%)]"></span>
                  <span className="inline-flex h-full w-full font-bold cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm text-white backdrop-blur-3xl gap-2 undefined">
                    See More
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
