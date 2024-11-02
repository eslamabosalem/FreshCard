import React, { useContext, useState } from "react";
import * as fontAwesome from "react-icons/fa"; //fontawesome icons
import * as bootstrapIcons from "react-icons/bs"; //bootstrap icons
import RatingStars from "../RatingStars/RatingStars";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext/CartContext";

import QtyCartInput from "./QtyCartInput";
import AddToWishListCheckBox from "../AddToWishListCheckBox/AddToWishListCheckBox";

export default function CartItem({ product }) {
  const { deleteCartItem } = useContext(CartContext);

  const [deleteLoading, setDeleteLoading] = useState(false);

  async function deleteItem(cartItemId) {
    setDeleteLoading(true);
    const response = await deleteCartItem(cartItemId);
    // setCart(response.data)
    setDeleteLoading(false);
  }

  return (
    <div className="p-2 bg-gradient-to-tr from-slate-400 via-slate-200 dark:bg-gradient-to-tr dark:from-slate-950 dark:via-slate-800 shadow-gray-600 shadow rounded-md relative">
      <div className="grid sm:grid-cols-2 items-center gap-4">
        <div className="rounded-md to-gray-50 w-full h-full p-4 shrink-0 text-center relative">
          <img
            src={product?.product?.imageCover}
            alt={product?.product?.title}
            className="w-56 h-full object-contain inline-block"
          />
          <AddToWishListCheckBox product={product?.product} />
        </div>
        <div className="p-2">
          <h3 className="text-lg font-bold">{product?.product?.title}</h3>
          <ul className="text-sm  space-y-2 list-disc pl-4 mt-3">
            <li className="flex justify-between items-center">
              <RatingStars rating={product?.product?.ratingsAverage} />
            </li>
            <li className="dark:text-gray-400 text-gray-600">
              Category :&nbsp;
              <span className="text-black dark:text-white font-semibold">
                {product?.product?.category?.name ?? ""}
              </span>
            </li>
            <li className="dark:text-gray-400 text-gray-600">
              Subcategory :&nbsp;
              <span className="text-black dark:text-white font-semibold">
                {product?.product?.subcategory?.[0]?.name ?? ""}
              </span>
            </li>
            <li className="dark:text-gray-400 text-gray-600">
              Brand :&nbsp;
              <span className="text-black dark:text-white font-semibold">
                {product?.product?.brand?.name ?? ""}
              </span>
            </li>
            <li className="dark:text-gray-400 text-gray-600">
              Price per piece :&nbsp;
              <span className="text-black dark:text-white font-extrabold">
                {product?.price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                LE
              </span>
            </li>
          </ul>

          <QtyCartInput product={product} />

          <div className="flex items-center justify-between sm:justify-center md:justify-between mt-6 flex-wrap">
            <h4 className="text-xl mb-0 sm:mb-2 md:mb-0 font-bold ">
              {(product?.price * product?.count)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              LE
            </h4>
            <div className=" flex gap-2 text-center  justify-end">
              <Link
                to={`/productDetails/${product?.product?.id}/${product?.product?.category?.name}`}
                className="bg-green-950 flex items-center text-green-200 border border-green-400 border-b-4 font-medium overflow-hidden relative px-2 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
              >
                <span className="bg-green-400 shadow-green-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                <fontAwesome.FaEye className="me-2" />
                Details
              </Link>
              <button
                disabled={deleteLoading}
                onClick={() => deleteItem(product?.product.id)}
                className="disabled:cursor-not-allowed bg-red-950 flex items-center text-red-200 border border-red-400 border-b-4 font-medium overflow-hidden relative px-2 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
              >
                {deleteLoading ? (
                  <fontAwesome.FaSpinner className="animate-spin m-2" />
                ) : (
                  <>
                    <span className="bg-red-400 shadow-red-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                    <bootstrapIcons.BsFillCartDashFill className="me-2 text-xl" />
                    Remove
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
