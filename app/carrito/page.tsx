"use client";

import { CartProduct, Product } from "../lib/types.d";
import Producto from "../ui/cart/producto";
import { useCartStore } from "../lib/cart/useCartStore";
import MercadoPagoButton from "../ui/cart/mercadoPagoButton";

export default function Carrito() {
  const currentCarritoPrice = useCartStore((state) => state.totalPrice);
  const carrito = useCartStore((state) => state.cart);

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Carrito
            </h1>
          </header>

          <div className="mt-8">
            <ul className="space-y-4">
              {carrito.map((product: CartProduct) => (
                <li key={product.id} className="flex items-center gap-4">
                  <Producto product={product} />
                </li>
              ))}
            </ul>

            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
              <div className="w-screen max-w-lg space-y-4">
                <div className="space-y-0.5 text-sm text-gray-700 flex justify-between font-medium">
                  <span>Total</span>
                  <span>{"$" + currentCarritoPrice / 100}</span>
                </div>

                <MercadoPagoButton />

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
