import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

import { UserContext } from "../UserContext/UserContext";
import { Bounce, toast } from "react-toastify";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const { userLogin } = useContext(UserContext);

  const [productsCount, setProductsCount] = useState(null);
  const [cart, setCart] = useState(null);

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

  async function getCart() {
    const headers = {
      token: userLogin,
    };
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { headers }
      );
      setProductsCount(response.data.numOfCartItems);

      setCart(response.data);
      return response;
    } catch (error) {
      setProductsCount(null);
      return error.response.data.message
        .split(" ")
        .slice(0, 6)
        .join(" ")
        .slice(0, -1);
    }
  }

  //add product to cart
  async function addProductToCart(productId) {
    const headers = {
      token: userLogin,
    };
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        { headers }
      )
      .then((response) => {
        getCart();
        if (response?.data.status == "success") {
          setProductsCount(response.data.numOfCartItems);
          toast.success(response.data.message, successToast);
          return response;
        }
        response;
      })
      .catch((error) => {
        return error;
      });
  }

  //delete cart item
  async function deleteCartItem(cartItemId) {
    const headers = {
      token: userLogin,
    };
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${cartItemId}`, {
        headers,
      })
      .then((response) => {
        if (response?.data.status == "success") {
          setCart(response.data);
          response.data.numOfCartItems == 0
            ? setProductsCount(null)
            : setProductsCount(response.data.numOfCartItems);
          toast.success(
            "product removed from your cart successfully",
            successToast
          );
          return response;
        }
      })
      .catch((error) => {
        toast.error("error deleting item");
        return error;
      });
  }

  //clear cart
  async function clearCart() {
    const headers = {
      token: userLogin,
    };
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((response) => {
        if (response.data.message == "success") {
          setProductsCount(null);
          setCart({
            //////////////////////
            status: "success",
            numOfCartItems: 0,
            data: {
              _id: "",
              cartOwner: "",
              products: [],
              createdAt: "",
              updatedAt: "",
              __v: "",
              totalCartPrice: 0,
            },
          });
          return response;
        }
      })
      .catch((error) => {
        return error;
      });
  }

  //update product quantity
  async function updateProductQuantity(cartItemId, quantity) {
    const headers = {
      token: userLogin,
    };
    try {
      const response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${cartItemId}`,
        { count: quantity },
        { headers }
      );
      setCart(JSON.parse(JSON.stringify(response.data)));
      toast.success("Quantity updated successfully", successToast);
      return response;
    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
    if (userLogin) {
      getCart();
    }
  }, [userLogin]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        updateProductQuantity,
        productsCount,
        setProductsCount,
        getCart,
        addProductToCart,
        deleteCartItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
