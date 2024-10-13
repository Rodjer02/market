"use client";
import { useEffect, useState } from "react";
import { Product } from "../type/product";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import Filter from "./Filter";
import SearchInput from "./SearchInput";

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
  );

  return (
    <div className="p-6 bg-gray-900 text-white">
      <h1>Список товаров</h1>
      <div className="py-6">
        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={(name) => setSearchQuery(name)}
        />
        <Filter
          types={productTypes}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
        />
        <div className="flex space-x-4">
          <button
            onClick={() => setSortOrder("asc")}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Сортировка по возрастанию
          </button>
          <button
            onClick={() => setSortOrder("desc")}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Сортировка по убыванию
          </button>
        </div>
      </div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 pb-6">
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
