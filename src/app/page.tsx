import Cart from "./components/Cart";
import OpenCartButton from "./components/OpenCartButton";
import ProductList from "./components/ProductList";

const HomePage = () => {
  return (
    <div>
      <h1 className="text-2xl">Главная страница магазина</h1>
      {/* Другие элементы страницы */}
      <ProductList />
      <Cart />
      <OpenCartButton />
    </div>
  );
};

export default HomePage;
