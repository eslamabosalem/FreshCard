import { Link } from "react-router-dom";
import MainLoading from "../MainLoading/MainLoading";
import Title from "../Title/Title";
import { Helmet } from "react-helmet";
import useAllCategories from "../../Hooks/AllCategories/useAllCategories";

export default function Categories() {
  const { data: categories, isLoading } = useAllCategories();

  if (isLoading) {
    return <MainLoading />;
  }

  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <div className="container py-24 min-h-screen flex flex-col justify-center">
        <Title title={"Shop By Category"} my={"mt-8"} mx={"mx-auto"} />
        <div className="grid p-5 sm:p-0 sm:py-10 grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-4  xl:px-28">
          <div className="grid gap-4">
            {categories?.slice(0, 3).map((category) => {
              return (
                <Link
                  onClick={() => scrollTo(0, 0)}
                  key={category._id}
                  to={`/${category?.name}/Products/${category._id}/category`}
                  className="rounded-lg relative group block overflow-hidden hover:shadow-lg hover:shadow-slate-700 transition-all duration-500"
                >
                  <img
                    className="group-hover:blur-sm shadow-md hover:shadow-lg transition duration-300 ease-in-out h-full w-full object-cover"
                    src={category.image}
                  />
                  <div className="absolute top-0 -left-full group-hover:left-0 opacity-0  group-hover:opacity-100 transition-all duration-500 w-full h-full bg-black/50 flex items-center justify-center">
                    <h1 className="text-white text-2xl font-bold">
                      {category.name}
                    </h1>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="grid gap-4">
            {categories?.slice(3, 6).map((category, index) => {
              return (
                <Link
                  onClick={() => scrollTo(0, 0)}
                  to={`/${category?.name}/Products/${category._id}/category`}
                  key={category._id}
                  className="rounded-lg relative group block overflow-hidden hover:shadow-lg hover:shadow-slate-700 transition-all duration-500"
                >
                  <img
                    className="rounded-lg group-hover:blur-sm shadow-md hover:shadow-lg transition duration-300 ease-in-out h-full w-full object-cover"
                    src={category.image}
                  />
                  <div
                    className={`absolute ${
                      index % 2 == 0
                        ? `-bottom-full group-hover:bottom-0`
                        : `-top-full group-hover:top-0`
                    } opacity-0  group-hover:opacity-100 transition-all duration-500 w-full h-full bg-black/50 flex items-center justify-center`}
                  >
                    <h1 className="text-white text-2xl font-bold">
                      {category.name}
                    </h1>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="grid gap-4 ">
            {categories?.slice(6, 10).map((category) => {
              return (
                <Link
                  onClick={() => scrollTo(0, 0)}
                  to={`/${category?.name}/Products/${category._id}/category`}
                  key={category._id}
                  className="rounded-lg relative group block overflow-hidden hover:shadow-lg hover:shadow-slate-700 transition-all duration-500"
                >
                  <img
                    className=" group-hover:blur-sm shadow-md transition duration-300 ease-in-out h-full w-full object-cover"
                    src={category.image}
                  />
                  <div className="absolute top-0  -right-full group-hover:right-0 opacity-0  group-hover:opacity-100 transition-all duration-500 w-full h-full bg-black/50 flex items-center justify-center">
                    <h1 className="text-white text-2xl font-bold">
                      {category.name}
                    </h1>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
