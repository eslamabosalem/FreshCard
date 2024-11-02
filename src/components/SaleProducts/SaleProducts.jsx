import React, { useEffect, useState } from "react";
import * as fontAwesome from "react-icons/fa"; //fontawesome icons
import useAllProducts from "../../Hooks/AllProducts/useAllProducts";
import ProductCard from "../ProductCard/ProductCard";
import useAddDeleteCart from "../../Hooks/AddDeleteCart/useAddDeleteCart";
import MainLoading from "../MainLoading/MainLoading";
import { Helmet } from "react-helmet";
import { Tabs } from "flowbite-react";
import { GiLargeDress } from "react-icons/gi";
import Title from "../Title/Title";
import { motion } from "framer-motion";
import AccessModal from "../AccessModal/AccessModal";

export default function SaleProducts() {
  const { addProduct, deleteItem, currentId, loading } = useAddDeleteCart();
  const { data: allProducts, isLoading } = useAllProducts();

  const [onSaleWoman, setOnSaleWoman] = useState(
    allProducts?.filter(
      (product) =>
        product?.priceAfterDiscount &&
        product?.category?.name == "Women's Fashion"
    )
  );
  const [onSaleMen, setOnSaleMen] = useState(
    allProducts?.filter(
      (product) =>
        product?.priceAfterDiscount &&
        product?.category?.name == "Men's Fashion"
    )
  );

  const [onSaleElectronics, setOnSaleElectronics] = useState(
    allProducts?.filter(
      (product) =>
        product?.priceAfterDiscount && product?.category?.name == "Electronics"
    )
  );

  useEffect(() => {
    setOnSaleWoman(
      allProducts?.filter(
        (product) =>
          product?.priceAfterDiscount &&
          product?.category?.name == "Women's Fashion"
      )
    );
    setOnSaleMen(
      allProducts?.filter(
        (product) =>
          product?.priceAfterDiscount &&
          product?.category?.name == "Men's Fashion"
      )
    );
    setOnSaleElectronics(
      allProducts?.filter(
        (product) =>
          product?.priceAfterDiscount &&
          product?.category?.name == "Electronics"
      )
    );
  }, [allProducts]);

  const [openModal, setOpenModal] = useState(false);
  const [ModalPlace, setModalPlace] = useState("");

  if (isLoading) {
    return <MainLoading />;
  }

  return (
    <>
      {openModal && (
        <AccessModal setOpenModal={setOpenModal} place={ModalPlace} />
      )}
      <Helmet>
        <title>On Sale Products</title>
      </Helmet>

      <div className="container py-24 min-h-screen">
        <Title title={"Discounted Products"} mx={"mx-auto"} my={"my-4"} />
        <Tabs
          className="justify-center sm:gap-10"
          aria-label="Tabs with underline"
          variant="underline"
        >
          <Tabs.Item active title="Men" icon={fontAwesome.FaTshirt}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid sm:grid-cols-2 min-h-full md:grid-cols-3 xl:grid-cols-5 justify-center">
                {onSaleMen?.map((product) => {
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
            </motion.div>
          </Tabs.Item>

          <Tabs.Item title="Woman" icon={GiLargeDress}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid sm:grid-cols-2 min-h-full md:grid-cols-3 xl:grid-cols-5 justify-center">
                {onSaleWoman?.map((product) => {
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
            </motion.div>
          </Tabs.Item>

          <Tabs.Item title="Electronics" icon={fontAwesome.FaLaptop}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid sm:grid-cols-2 min-h-full md:grid-cols-3 xl:grid-cols-5 justify-center">
                {onSaleElectronics?.map((product) => {
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
            </motion.div>
          </Tabs.Item>
        </Tabs>
      </div>
    </>
  );
}
