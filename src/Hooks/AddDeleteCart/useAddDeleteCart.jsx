import { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext/CartContext";

export default function useAddDeleteCart() {
  const { addProductToCart, deleteCartItem } = useContext(CartContext);

  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  //add product to cart
  async function addProduct(productId) {
    setCurrentId(productId);
    setLoading(true);
    const response = await addProductToCart(productId);
    setLoading(false);
  }

  //delete from cart
  async function deleteItem(productId) {
    setCurrentId(productId);
    setLoading(true);
    const response = await deleteCartItem(productId);
    setLoading(false);
  }

  return {
    addProduct,
    deleteItem,
    setLoading,
    loading,
    setCurrentId,
    currentId,
  };
}
