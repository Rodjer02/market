"use client";
import { useCartStore } from "../store/cartStore";

const OpenCartButton = () => {
  const { openCart } = useCartStore();

  return (
    <button
      className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg"
      onClick={openCart}
    >
      Открыть корзину
    </button>
  );
};

export default OpenCartButton;
