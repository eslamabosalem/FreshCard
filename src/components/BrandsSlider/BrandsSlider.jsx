import useAllBrands from "../../Hooks/AllBrands/useAllBrands";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function BrandsSlider() {
  const { data: brands } = useAllBrands();

  if (!brands) {
    return <></>;
  }
  const duplicatedBrands = [...brands, ...brands];
  return (
    <div className="brands-slider row pt-1 relative">
      <Swiper
        speed={6000}
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          550: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
          900: {
            slidesPerView: 5,
            spaceBetween: 0,
          },
          1200: {
            slidesPerView: 6,
            spaceBetween: 0,
          },
          1285: {
            slidesPerView: 7,
            spaceBetween: 0,
          },
          1400: {
            slidesPerView: 8,
            spaceBetween: 0,
          },
          2000: {
            slidesPerView: 10,
            spaceBetween: 0,
          },
        }}
        loop={true}
        allowTouchMove={false}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        navigation={false}
        modules={[Autoplay]}
      >
        {duplicatedBrands?.map((brand, idx) => (
          <SwiperSlide className=" " key={idx}>
            <Link
              className="w-[150px] block"
              onClick={() => window.scrollTo(0, 0)}
              to={`/${brand?.name}/Products/${brand._id}/brand`}
            >
              <img
                src={brand.image}
                className="rounded-md  brightness-50 hover:brightness-100 transition-all duration-300 cursor-pointer"
                alt={brand.name}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
