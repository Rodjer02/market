"use client";

import React from "react";
import { useCartStore } from "../store/cartStore"; // Импортируем cartStore
import { Product } from "../type/product";

const ProductCard = ({ product }: { product: Product }) => {
  const addProduct = useCartStore((state) => state.addProduct);
  const openCart = useCartStore((state) => state.openCart); // Открываем корзину после добавления товара

  const handleAddProduct = () => {
    addProduct(product);
  };

  return (
    <div className="border p-4 rounded-md">
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p>Цена: {product.price} $</p>
      <img src={product.image} alt={product.name} width="100" />
      <button
        onClick={handleAddProduct}
        className="mt-2 bg-blue-500 text-white py-1 px-3 rounded"
      >
        Добавить в корзину
      </button>
    </div>
  );
};

export default ProductCard;
