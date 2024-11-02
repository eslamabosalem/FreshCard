import React, { useContext, useState } from "react";
import "./AddToWishListCheckBox.css";
import * as fontAwesome from "react-icons/fa"; //fontawesome icons
import { WishListContext } from "../../Context/WishListContext/WishListContext";
import { CartContext } from "../../Context/CartContext/CartContext";
import { UserContext } from "../../Context/UserContext/UserContext";
import { useNavigate } from "react-router-dom";

export default function AddToWishListCheckBox({
  product,
  setModalPlace,
  setOpenModal,
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { addProductToWishList, deleteProductFromWishList, wishListIds } =
    useContext(WishListContext);
  const { userLogin } = useContext(UserContext);

  const {
    cart,

    deleteCartItem,
  } = useContext(CartContext);

  async function addToWl(productId) {
    setLoading(true);
    await addProductToWishList(productId);
    setLoading(false);
  }

  async function deleteFromWl(productId) {
    setLoading(true);
    await deleteProductFromWishList(productId);
    setLoading(false);
  }

  return (
    <>
      <div
        className="heart-container absolute z-30 top-1 left-1 "
        title="Add to wishlist"
      >
        <input
          disabled={loading}
          onChange={(e) => {
            if (userLogin) {
              !e.target.checked
                ? deleteFromWl(product?.id)
                : cart?.data?.products?.some(
                    (_productObj) => _productObj.product?.id === product?.id
                  )
                ? (addToWl(product?.id), deleteCartItem(product?.id))
                : addToWl(product?.id);
            } else {
              setOpenModal(true);
              setModalPlace("Wish List");
            }
          }}
          type="checkbox"
          className="checkbox disabled:cursor-not-allowed"
          checked={userLogin ? wishListIds?.includes(product?.id) : false}
        />
        <div className="svg-container">
          {loading ? (
            <fontAwesome.FaSpinner className="text-black bg-white/70 rounded-full  animate-spin text-2xl" />
          ) : (
            <>
              <svg
                viewBox="0 0 24 24"
                className="svg-outline"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
              </svg>
              <svg
                viewBox="0 0 24 24"
                className="svg-filled"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
              </svg>
              <svg
                className="svg-celebrate"
                width={100}
                height={100}
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon points="10,10 20,20" />
                <polygon points="10,50 20,50" />
                <polygon points="20,80 30,70" />
                <polygon points="90,10 80,20" />
                <polygon points="90,50 80,50" />
                <polygon points="80,80 70,70" />
              </svg>
            </>
          )}
        </div>
      </div>
    </>
  );
}
