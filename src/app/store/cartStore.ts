import { create } from 'zustand';
import { Product } from '../type/product';

interface CartState {
  isOpen: boolean;
  products: Product[]; // Указываем, что продукты имеют поле quantity
  openCart: () => void;
  closeCart: () => void;
  addProduct: (product: Product) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  getTotalPrice: () => number; // Функция для получения итоговой стоимости
}

export const useCartStore = create<CartState>((set, get) => ({
  isOpen: false,
  products: [],
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  addProduct: (product) => {
    const { products, increaseQuantity } = get(); // Получаем текущее состояние и функцию increaseQuantity
    const existingProduct = products.find((p) => p.id === product.id);
    
    if (existingProduct) {
      // Если продукт уже есть в корзине, увеличиваем количество
      increaseQuantity(existingProduct.id);
    } else {
      // Если продукта нет в корзине, добавляем его с количеством 1
      set((state) => ({
        products: [...state.products, { ...product, quantity: 1 }],
      }));
    }
  },
  increaseQuantity: (id) => set((state) => ({
    products: state.products.map((product) =>
      product.id === id ? { ...product, quantity: product.quantity + 1 } : product
    ),
  })),
  decreaseQuantity: (id) => set((state) => {
    const product = state.products.find((product) => product.id === id);
    
    if (product && product.quantity > 1) {
      return {
        products: state.products.map((p) =>
          p.id === id ? { ...p, quantity: p.quantity - 1 } : p
        ),
      };
    } else {
      // Если количество товара 1, удаляем его из корзины
      return {
        products: state.products.filter((p) => p.id !== id),
      };
    }
  }),
  getTotalPrice: () => {
    const { products } = get();
    return products.reduce((total, product) => total + product.price * product.quantity, 0);
  },
}));