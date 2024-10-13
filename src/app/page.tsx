import Cart from "./components/Cart";
import OpenCartButton from "./components/OpenCartButton";
import ProductList from "./components/ProductList";

const HomePage = () => {
  return (
    <div>
      <ProductList />
      <Cart />
      <OpenCartButton />
    </div>
  );
};

export default HomePage;
