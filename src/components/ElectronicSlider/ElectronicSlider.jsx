import React, { useEffect, useState } from "react";
import Title from "../Title/Title";
import useAllProducts from "../../Hooks/AllProducts/useAllProducts";
import useAddDeleteCart from "../../Hooks/AddDeleteCart/useAddDeleteCart";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import ProductCard from "../ProductCard/ProductCard";
import AccessModal from "../AccessModal/AccessModal";

export default function ElectronicSlider() {
  const { data: allProducts } = useAllProducts();

  const [electronics, setElectronics] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [ModalPlace, setModalPlace] = useState("");

  useEffect(() => {
    setElectronics(
      allProducts?.filter((product) => product?.category?.name == "Electronics")
    );
  }, [allProducts]);

  const { addProduct, deleteItem, currentId, loading } = useAddDeleteCart();
  return (
    <section id="eleSlider" className="container mt-28">
      {openModal && (
        <AccessModal setOpenModal={setOpenModal} place={ModalPlace} />
      )}
      <Title title={"Electronics"} my={"mt-8"} mx={"mx-auto"} />
      <div className="ele-slider row pt-1 relative">
        <Swiper
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
          speed={1000}
          navigation={true}
          modules={[Autoplay, Navigation]}
          className="related-slider static"
        >
          {electronics?.map((product) => (
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
    </section>
  );
}
