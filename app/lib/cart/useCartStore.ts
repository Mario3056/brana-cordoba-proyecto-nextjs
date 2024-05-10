import { create } from "zustand"
import { Product } from "../types"
import { persist } from "zustand/middleware"

// Define the interface of the Cart state
interface State {
    cart: Product[]
    totalItems: number
    totalPrice: number
}

// Define the interface of the actions that can be performed in the Cart
interface Actions {
    addToCart: (Item: Product) => void
    removeFromCart: (Item: Product) => void
}

// Initialize a default state
const INITIAL_STATE: State = {
    cart: [],
    totalItems: 0,
    totalPrice: 0,
}

// Create the store with Zustand, combining the status interface and actions
export const useCartStore = create(persist<State & Actions>((set, get) => ({
    cart: INITIAL_STATE.cart,
    totalItems: INITIAL_STATE.totalItems,
    totalPrice: INITIAL_STATE.totalPrice,
    addToCart: (product: Product) => {
        const cart = get().cart
        const cartItem = cart.find(item => item.id === product.id)

        if (cartItem == undefined) {
            const updatedCart = [...cart, { ...product}]

            set(state => ({
                cart: updatedCart,
                totalItems: state.totalItems + 1,
                totalPrice: state.totalPrice + product.price,
            }))
        }
    },
    removeFromCart: (product: Product) => {
        set(state => ({
            cart: state.cart.filter(item => item.id !== product.id),
            totalItems: state.totalItems - 1,
            totalPrice: state.totalPrice - product.price,
        }))
    },
}),
    {
        name: "carrito"
    }
))