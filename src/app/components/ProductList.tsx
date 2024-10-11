"use client";
import { useEffect, useState } from "react";
import { Product } from "../type/product";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import Filter from "./Filter";

async function getProducts() {
  const res = await fetch("http://localhost:3001/products", {
    cache: "no-store", // Отключение кэширования для получения свежих данных
  });
  if (!res.ok) throw new Error("Не удалось загрузить данные");
  return res.json();
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const [selectedType, setSelectedType] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const filteredAndSortedProducts = products
    .filter(
      (product) =>
        (!selectedType || product.type === selectedType) &&
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

  const currentProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );
  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / productsPerPage
  );
  const productTypes = Array.from(
    new Set(products.map((product) => product.type))
  ); // Уникальные типы товаров

  return (
    <div>
      <h1>Список товаров</h1>
      <input
        type="text"
        placeholder="Поиск по названию..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 border"
      />
      <Filter
        types={productTypes}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
      />
      <div className="mb-4">
        <button
          onClick={() => setSortOrder("asc")}
          className="mr-2 p-2 border bg-gray-200"
        >
          Сортировка по возрастанию
        </button>
        <button
          onClick={() => setSortOrder("desc")}
          className="p-2 border bg-gray-200"
        >
          Сортировка по убыванию
        </button>
      </div>
      <ul>
        {currentProducts.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ProductList;
