import React, { useEffect, useRef, useState } from "react";
import * as fontAwesome from "react-icons/fa"; //fontawesome icons
import MainLoading from "../MainLoading/MainLoading";
import ProductCard from "../ProductCard/ProductCard";
import useAddDeleteCart from "../../Hooks/AddDeleteCart/useAddDeleteCart";
import Title from "../Title/Title";
import useAllProducts from "../../Hooks/AllProducts/useAllProducts";
import { Label, Pagination, Select } from "flowbite-react";
import { Helmet } from "react-helmet";
import AccessModal from "../AccessModal/AccessModal";

export default function Products() {
  const { data, isLoading } = useAllProducts();
  const [allProducts, setAllProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);

  useEffect(() => {
    if (data) {
      setOriginalProducts(data);
      setAllProducts(data);
    }
  }, [data]);

  const { deleteItem, addProduct, currentId, loading } = useAddDeleteCart();

  const cardsPerPage = 15;
  const [showPagination, setShowPagination] = useState(true);
  const [pagintaion, setPagintaion] = useState({
    from: 0,
    to: cardsPerPage,
  });
  const [currentPage, setCurrentPage] = useState(1);

  function handlePagintaion(page) {
    const from = (page - 1) * cardsPerPage;
    const to = page * cardsPerPage;
    setPagintaion({ ...pagintaion, from, to });
    setCurrentPage(page);
  }

  function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm === "") {
      setAllProducts(originalProducts);
    } else {
      const filteredProducts = originalProducts.filter((product) => {
        return (
          product.title.toLowerCase().includes(searchTerm) ||
          product.brand.name.toLowerCase().includes(searchTerm)
        );
      });
      setAllProducts(filteredProducts);
    }
  }

  function handleSortByCategoryOrBrand(event) {
    if (event.target.id === "categories") {
      const category = event.target.value;
      if (category === "allCategories") {
        setAllProducts(originalProducts);
      } else {
        const filteredProducts = originalProducts.filter(
          (product) => product?.category?.name === category
        );
        setAllProducts(filteredProducts);
      }
    } else if (event.target.id === "brands") {
      const brand = event.target.value;
      if (brand === "allBrands") {
        setAllProducts(originalProducts);
      } else {
        const filteredProducts = originalProducts.filter(
          (product) => product?.brand?.name === brand
        );
        setAllProducts(filteredProducts);
      }
    }
  }

  function handleSelectClick(event) {
    setCurrentPage(1);
    setPagintaion({ from: 0, to: cardsPerPage });
    if (searchInput.current.value.length > 0) {
      searchInput.current.value = "";
      setAllProducts(data);
      setShowPagination(true);
    }
    if (event.target.id === "categories") {
      if (brandsSelect.current.value !== "allBrands") {
        brandsSelect.current.value = "allBrands";
        setAllProducts(originalProducts);
      } else {
        return;
      }
    } else if (event.target.id === "brands") {
      if (categoriesSelect.current.value !== "allCategories") {
        categoriesSelect.current.value = "allCategories";
        setAllProducts(originalProducts);
      } else {
        return;
      }
    }
  }

  const [openModal, setOpenModal] = useState(false);
  const [ModalPlace, setModalPlace] = useState("");

  const categoriesSelect = useRef(null);
  const brandsSelect = useRef(null);
  const searchInput = useRef(null);
  const [categoriesArr, setCategoriesArr] = useState([]);
  const [brandsArr, setBrandsArr] = useState([]);

  useEffect(() => {
    setCategoriesArr([
      ...new Set(data?.map((product) => product?.category?.name)),
    ]);
    setBrandsArr([...new Set(data?.map((product) => product?.brand?.name))]);
  }, [data]);

  if (isLoading) {
    return <MainLoading />;
  }

  return (
    <>
      <Helmet>
        <title>All Products</title>
      </Helmet>

      {openModal && (
        <AccessModal setOpenModal={setOpenModal} place={ModalPlace} />
      )}

      <div className="container py-24 min-h-screen flex flex-col justify-center">
        <Title title={"All Products"} my={"mt-8"} mx={"mx-auto"} />
        <div className="flex flex-col md:flex-row flex-wrap md:flex-nowrap md:px-2 justify-between gap-5 my-8">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="categories" value="Sort By Category" />
            </div>
            <Select
              onClick={(e) => {
                handleSelectClick(e);
              }}
              ref={categoriesSelect}
              onChange={(e) => handleSortByCategoryOrBrand(e)}
              id="categories"
              required
            >
              <option value="allCategories">All Categories</option>
              {categoriesArr?.map((category, idx) => (
                <option key={idx} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="flex self-end items-center w-full md:max-w-xs lg:max-w-md order-last md:order-none"
          >
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <fontAwesome.FaSearch />
              </div>
              <input
                ref={searchInput}
                onFocus={() => {
                  setShowPagination(false);
                  if (
                    categoriesSelect.current.value !== "allCategories" ||
                    brandsSelect.current.value !== "allBrands"
                  ) {
                    categoriesSelect.current.value = "allCategories";
                    brandsSelect.current.value = "allBrands";
                    setAllProducts(data);
                  } else {
                    return;
                  }
                }}
                onBlur={(e) =>
                  e.target.value.length > 0
                    ? setShowPagination(false)
                    : setShowPagination(true)
                }
                onInput={(e) => {
                  e.target.value == ""
                    ? setShowPagination(true)
                    : setShowPagination(false);
                  setCurrentPage(1);
                  setPagintaion({ from: 0, to: cardsPerPage });
                }}
                onChange={(e) => {
                  handleSearch(e);
                }}
                type="search"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search By Brand OR Product Name..."
                required
              />
            </div>
          </form>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="brands" value="Sort By Brand" />
            </div>

            <Select
              ref={brandsSelect}
              onClick={(e) => {
                handleSelectClick(e);
              }}
              onChange={(e) => handleSortByCategoryOrBrand(e)}
              id="brands"
              required
            >
              <option value="allBrands">All Brands</option>
              {brandsArr?.map((brand, idx) => (
                <option key={idx} value={brand}>
                  {brand}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {allProducts.length == 0 ? (
          <div className="relative w-full flex items-center text-center mt-8 pt-8 px-5">
            <div className="absolute top-0 right-0 bottom-0 left-0 " />
            <div className="z-30 flex flex-col items-center w-full">
              <fontAwesome.FaFrownOpen className="text-9xl mb-6" />
              <h1 className="text-4xl font-semibold">
                There are no products with this name or brand
              </h1>
            </div>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 min-h-full md:grid-cols-3 xl:grid-cols-5 justify-center">
              {allProducts
                ?.slice(pagintaion?.from, pagintaion?.to)
                ?.map((product) => {
                  return (
                    <ProductCard
                      setModalPlace={setModalPlace}
                      setOpenModal={setOpenModal}
                      product={product}
                      key={product?.id}
                      loading={loading}
                      currentId={currentId}
                      deleteItem={deleteItem}
                      addProduct={addProduct}
                    />
                  );
                })}
            </div>
            {showPagination && (
              <div className="flex overflow-x-auto sm:justify-center mt-3">
                <Pagination
                  onClick={() => scrollTo(0, 150)}
                  color="primary"
                  currentPage={currentPage}
                  totalPages={Math.ceil(allProducts?.length / cardsPerPage)} // count
                  onPageChange={handlePagintaion}
                  showIcons
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
