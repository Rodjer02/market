"use client";

import React from "react";
import { useCartStore } from "../store/cartStore";
import { Product } from "../type/product";

const ProductCard = ({ product }: { product: Product }) => {
  const addProduct = useCartStore((state) => state.addProduct);
  const openCart = useCartStore((state) => state.openCart);
  const handleAddProduct = () => {
    addProduct(product);
  };

  return (
    <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <img
        src={product.image}
        alt={product.name}
        width="100"
        className="w-full h-40 object-contain mb-4 rounded"
      />
      <h2 className="text-xl font-semibold text-white mb-2">{product.name}</h2>
      <p className="text-gray-400 mb-4">Цена: {product.price} $</p>

      <button
        onClick={handleAddProduct}
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Добавить в корзину
      </button>
    </div>
  );
};

export default ProductCard;
