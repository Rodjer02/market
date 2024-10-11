"use client";

import React from "react";
import { useCartStore } from "../store/cartStore";

const Cart: React.FC = () => {
  const {
    isOpen,
    closeCart,
    products,
    increaseQuantity,
    decreaseQuantity,
    getTotalPrice,
  } = useCartStore();

  if (!isOpen) return null; // Если корзина закрыта, не отображаем ничего

  return (
    <div className="fixed top-0 right-0 bg-white border p-4">
      <h2 className="text-lg font-bold">Корзина</h2>
      <button onClick={closeCart} className="mt-2 text-red-500">
        Закрыть
      </button>
      <ul>
        {products.map((product) => (
          <li
            key={product.id}
            className="border-b py-2 flex justify-between items-center"
          >
            <div>
              <h3>{product.name}</h3>
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
      <h3>Итоговая стоимость: ${getTotalPrice()}</h3>
    </div>
  );
};

export default Cart;
