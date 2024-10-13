"use client";

import React from "react";
import { useCartStore } from "../store/cartStore";
import { FaWindowClose } from "react-icons/fa";

const Cart: React.FC = () => {
  const {
    isOpen,
    closeCart,
    products,
    increaseQuantity,
    decreaseQuantity,
    getTotalPrice,
  } = useCartStore();

  if (!isOpen) return null;

  return (
    <div
      className={`fixed top-0 right-0 lg:right-0 bg-white shadow-lg transition-transform transform z-50 
      ${isOpen ? "translate-x-0" : "translate-x-full"} 
      w-full h-full lg:w-80 lg:h-full lg:translate-x-0 bg-gray-900 p-3`}
    >
      <div className="flex justify-between items-center  mb-4">
        <h2 className="text-2xl font-bold">Корзина</h2>
        <button onClick={closeCart}>
          <FaWindowClose color="white" size={20} />
        </button>
      </div>

      <ul className="text-gray-700 mb-4">
        {products.map((product) => (
          <li
            key={product.id}
            className="border-b py-2 flex justify-between items-center"
          >
            <div>
              <h3 className="text-white">{product.name}</h3>
              <p>Цена: {product.price} $</p>
              <p>Количество: {product.quantity}</p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => decreaseQuantity(product.id)}
                className="mr-2 bg-red-500 text-white py-1 px-2 rounded"
              >
                -
              </button>
              <button
                onClick={() => increaseQuantity(product.id)}
                className="bg-green-500 text-white py-1 px-2 rounded"
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <p className="font-semibold text-lg">
          Итоговая стоимость: {getTotalPrice()} $
        </p>
      </div>
    </div>
  );
};

export default Cart;
