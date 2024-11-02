import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

import { UserContext } from "../UserContext/UserContext";
import { Bounce, toast } from "react-toastify";

export const WishListContext = createContext();

const WishListContextProvider = ({ children }) => {
  const successToast = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  };

  const { userLogin } = useContext(UserContext);
  const [wishList, setWishList] = useState([]);
  const [wishListIds, setWishListIds] = useState([]);
  const [wishListCount, setWishListCount] = useState(0);

  const headers = {
    token: userLogin,
  };

  async function addProductToWishList(productId) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        { headers }
      );

      setWishListCount(data.data.length);
      setWishListIds(data.data);
      toast.success(data.message, successToast);
      await getLoggedUserWishList();
      return data;
    } catch (error) {
      return error;
    }
  }

  async function deleteProductFromWishList(productId) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers }
      );
      setWishListCount(data.data.length);
      setWishListIds(data.data);
      toast.success(`Product removed from your wishlist`, successToast);
      await getLoggedUserWishList();
      return data;
    } catch (error) {
      return error;
    }
  }

  async function getLoggedUserWishList() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { headers }
      );
      setWishList(data.data);
      setWishListCount(data.count);
      setWishListIds(data.data.map((wl) => wl.id));
      return data.data;
    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
    if (userLogin) {
      getLoggedUserWishList();
    }
  }, [userLogin]);

  return (
    <WishListContext.Provider
      value={{
        getLoggedUserWishList,
        addProductToWishList,
        setWishListCount,
        wishListCount,
        wishList,
        wishListIds,
        setWishListIds,
        setWishList,
        deleteProductFromWishList,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};

export default WishListContextProvider;
