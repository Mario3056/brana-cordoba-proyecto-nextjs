import { create } from "zustand";
import type { CartProduct, Product } from "../types";
import { persist } from "zustand/middleware";

// Define the interface of the Cart state
interface State {
  cart: CartProduct[];
  totalItems: number;
  totalPrice: number;
}

// Define the interface of the actions that can be performed in the Cart
interface Actions {
  addToCart: (Item: Product) => void;
  removeFromCart: (Item: CartProduct) => void;
  updateQuantity: (Item: CartProduct, quantity: number) => void;
  clearCart: () => void;
}

// Initialize a default state
const INITIAL_STATE: State = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
};

// Create the store with Zustand, combining the status interface and actions
export const useCartStore = create(
  persist<State & Actions>(
    (set, get) => ({
      cart: INITIAL_STATE.cart,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
      addToCart: (product: Product) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item.id === product.id);

        // If the product is already in the cart, increase its quantity
        if (cartItem) {
          const updatedCart = cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: (item.quantity as number) + 1 }
              : item
          );
          const hasDiscount = (product.discount != undefined) && (product.discount != null) && (product.discount != 0.0);
	        const resultedPrice = (!hasDiscount) ? product.price : Math.trunc(product.price - (product.price * product.discount));

          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + resultedPrice,
          }));
        } else {
          const transformProduct = (entryProduct: Product): CartProduct => {
            return {
              id: entryProduct.id,
              name: entryProduct.name,
              category: entryProduct.category,
              price: entryProduct.price,
              image: entryProduct.image,
              quantity: 1,
              discount: entryProduct.discount,
            };
          };
          const newItem = transformProduct(product);

          const updatedCart = [...cart, { ...newItem }];

          const hasDiscount = (product.discount != undefined) && (product.discount != null) && (product.discount != 0.0);
	        const resultedPrice = (!hasDiscount) ? product.price : Math.trunc(product.price - (product.price * product.discount));

          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + resultedPrice,
          }));
        }
      },
      removeFromCart: (product: CartProduct) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item.id === product.id);

        if (cartItem !== undefined) {
          const hasDiscount = (product.discount != undefined) && (product.discount != null) && (product.discount != 0.0);
	        const resultedPrice = (!hasDiscount) ? product.price : Math.trunc(product.price - (product.price * product.discount));

          set((state) => ({
            cart: state.cart.filter((item) => item.id !== product.id),
            totalItems: state.totalItems - cartItem.quantity,
            totalPrice: state.totalPrice - (resultedPrice * cartItem.quantity),
          }));
        }
      },
      updateQuantity: (product: CartProduct, quantity: number) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item.id === product.id);

        if (cartItem && quantity > 0) {
          const oldQuantity = cartItem.quantity;
          const updatedCart = cart.map((item) =>
            item.id === product.id ? { ...item, quantity: quantity } : item
          );
          const hasDiscount = (product.discount != undefined) && (product.discount != null) && (product.discount != 0.0);
	        const resultedPrice = (!hasDiscount) ? product.price : Math.trunc(product.price - (product.price * product.discount));

          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems - (oldQuantity - quantity),
            totalPrice:
              state.totalPrice - ((oldQuantity - quantity) * resultedPrice),
          }));
        }
      },
      clearCart: () => {
        set(() => ({
          cart: INITIAL_STATE.cart,
          totalItems: INITIAL_STATE.totalItems,
          totalPrice: INITIAL_STATE.totalPrice,
        }));
      },
    }),
    {
      name: "carrito",
    }
  )
);
