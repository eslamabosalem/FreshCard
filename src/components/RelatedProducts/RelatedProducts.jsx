import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Navigation,
  Autoplay,
  FreeMode,
  Mousewheel,
} from "swiper/modules";
import MainLoading from "../MainLoading/MainLoading";
import ProductCard from "../ProductCard/ProductCard";
import useAddDeleteCart from "../../Hooks/AddDeleteCart/useAddDeleteCart";
import useAllProducts from "../../Hooks/AllProducts/useAllProducts";

export default function RelatedProducts({ setModalPlace, setOpenModal }) {
  const { id, category } = useParams();

  const { isLoading, data: allProducts } = useAllProducts();

  const [relatedProducts, setRelatedProducts] = useState(
    allProducts?.filter(
      (product) => product.category.name === category && product.id !== id
    )
  );

  useEffect(() => {
    setRelatedProducts(
      allProducts?.filter(
        (product) => product.category.name === category && product.id !== id
      )
    );
  }, [allProducts, id]);

  const { addProduct, deleteItem, currentId, loading } = useAddDeleteCart();

  if (isLoading) {
    return <MainLoading />;
  }

  return (
    <div className="mt-32">
      <h2 className="text-4xl relative mx-auto w-fit font-extrabold dark:text-slate-100 text-gray-800 my-8 ">
        Related Products
        <span className="absolute bottom-0 left-0 right-0 h-1/3 bg-blue-700/55 -z-30"></span>
      </h2>
      <div className="row pt-1 relative">
        <Swiper
          grabCursor={true}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            550: {
              slidesPerView: 2,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 0,
            },
            900: {
              slidesPerView: 3,
              spaceBetween: 0,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 0,
            },
            1500: {
              slidesPerView: 5,
              spaceBetween: 0,
            },
          }}
          autoplay={{
            delay: 2000,
            pauseOnMouseEnter: true,
          }}
          pagination={true}
          navigation={true}
          modules={[FreeMode, Pagination, Autoplay, Navigation, Mousewheel]}
          className="related-slider details-slider static"
        >
          {relatedProducts?.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard
                product={product}
                addProduct={addProduct}
                currentId={currentId}
                loading={loading}
                deleteItem={deleteItem}
                setModalPlace={setModalPlace}
                setOpenModal={setOpenModal}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
