import React, { useEffect, useState } from "react";
import * as fontAwesome from "react-icons/fa"; //fontawesome icons
import { Link, useNavigate, useParams } from "react-router-dom";
import useAllProducts from "../../Hooks/AllProducts/useAllProducts";
import MainLoading from "../MainLoading/MainLoading";
import Title from "../Title/Title";
import ProductCard from "../ProductCard/ProductCard";
import useAddDeleteCart from "../../Hooks/AddDeleteCart/useAddDeleteCart";
import soonImg from "../../assets/imgs/soon.jpg";
import { Helmet } from "react-helmet";
import AccessModal from "../AccessModal/AccessModal";

export default function SectionProducts() {
  const navigate = useNavigate();
  const { sectionId, section } = useParams();

  const { addProduct, deleteItem, currentId, loading } = useAddDeleteCart();
  const { data: allProducts, isLoading } = useAllProducts();

  const [sectionProducts, setSectionProducts] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [ModalPlace, setModalPlace] = useState("");

  useEffect(() => {
    if (section === "category") {
      setSectionProducts(
        allProducts?.filter((product) => product?.category?._id === sectionId)
      );
    } else {
      setSectionProducts(
        allProducts?.filter((product) => product?.brand?._id === sectionId)
      );
    }
  }, [allProducts]);

  if (isLoading) {
    return <MainLoading />;
  }

  if (sectionProducts?.length === 0) {
    return (
      <>
        <div className="relative h-screen w-full flex items-center justify-center bg-cover bg-center text-center px-5">
          <div className="absolute top-0 right-0 bottom-0 left-0 bg-gray-900 opacity-75" />
          <div className="z-30 flex flex-col justify-center text-white w-full h-screen">
            <h1 className="text-5xl mb-3">
              Coming <b>Soon</b>
            </h1>

            <div className="flex flex-col items-center my-5">
              <img
                src={soonImg}
                alt="Logo"
                className="object-cover w-40 h-40 mb-8 rounded-full"
              />
              <p>
                We are working hard to bring you something good. Stay tuned!
              </p>
              <div className="flex items-center flex-wrap justify-center gap-3 mt-4">
                <button
                  onClick={() => navigate(-1)}
                  className="group mt-2 relative overflow-hidden bg-green-700 focus:ring-4 focus:ring-green-300 inline-flex items-center px-3 sm:px-7 py-2.5 rounded-lg text-white justify-center"
                >
                  <span className="z-40 flex items-center">
                    <fontAwesome.FaArrowAltCircleLeft className="me-2 text-xl" />
                    {"GO Back"}
                  </span>
                  <div className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 group-hover:translate-x-[50%] z-20 duration-1000"></div>
                </button>
                <Link
                  to={"/"}
                  className="group mt-2 relative overflow-hidden bg-blue-700 focus:ring-4 focus:ring-orange-300 inline-flex items-center px-7 py-2.5 rounded-lg text-white justify-center"
                >
                  <span className="z-40 flex items-center">
                    <fontAwesome.FaHome className="me-2 text-xl" />
                    {"Go Home"}
                  </span>
                  <div className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 group-hover:translate-x-[50%] z-20 duration-1000"></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {openModal && (
        <AccessModal setOpenModal={setOpenModal} place={ModalPlace} />
      )}
      <div className="container py-24 min-h-screen">
        <Title
          title={`${
            section == "category"
              ? sectionProducts?.[0]?.category?.name
              : sectionProducts?.[0]?.brand?.name
          } Products`}
          my={"my-8"}
          mx={"mx-auto"}
        />

        <Helmet>
          <title>
            {section == "category"
              ? sectionProducts?.[0]?.category?.name + " products"
              : sectionProducts?.[0]?.brand?.name + " products"}
          </title>
        </Helmet>
        <div className="grid sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 justify-center">
          {sectionProducts?.map((product) => {
            return (
              <ProductCard
                product={product}
                key={product?.id}
                loading={loading}
                currentId={currentId}
                deleteItem={deleteItem}
                addProduct={addProduct}
                setModalPlace={setModalPlace}
                setOpenModal={setOpenModal}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
