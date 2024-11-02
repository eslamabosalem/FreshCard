import { Link } from "react-router-dom";
import MainLoading from "../MainLoading/MainLoading";
import Title from "../Title/Title";
import useAllBrands from "../../Hooks/AllBrands/useAllBrands";
import { Helmet } from "react-helmet";

export default function Brands() {
  const { data: brands, isLoading } = useAllBrands();

  if (isLoading) {
    return <MainLoading />;
  }

  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      <div className="container py-24 min-h-screen flex flex-col justify-center">
        <Title title={"Shop By Brand"} my={"mt-8"} mx={"mx-auto"} />
        <section className="">
          <div className=" px-8 md:px-12 mx-auto py-12 lg:py-20 space-y-24 flex flex-col justify-center">
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-20 lg:gap-10 h-full mx-auto">
              {brands?.map((brand) => {
                const rotateClass =
                  Math.random() < 0.3 ? "rotate-6" : "-rotate-12";
                return (
                  <Link
                    onClick={() => scrollTo(0, 0)}
                    to={`/${brand?.name}/Products/${brand._id}/brand`}
                    key={brand._id}
                    className="block"
                    brand-id={brand._id}
                  >
                    <img
                      src={brand.image}
                      className={`rounded-xl ${rotateClass} hover:shadow-xl dark:hover:shadow-md dark:hover:shadow-slate-500 hover:z-30 relative hover:rotate-0 duration-500  h-full w-full object-cover hover:shadow-slate-600 hover:scale-110 sm:hover:scale-125 transform origin-bottom`}
                      alt="#_"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
