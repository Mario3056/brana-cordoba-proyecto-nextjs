"use client";

import { CartProduct, Product } from "../lib/types.d";
import Producto from "@/app/ui/cart/producto";
import { useCartStore } from "@/app/lib/cart/useCartStore";
import MercadoPagoButton from "@/app/ui/cart/mercadoPagoButton";

import TitleEffect from '@/app/ui/setTitle';

export default function Carrito() {
  const currentCarritoPrice = useCartStore((state) => state.totalPrice);
  const carrito = useCartStore((state) => state.cart);

  return (
    <section>
	  <TitleEffect title="Carrito de productos - LibreMercado" />
	  
      {(carrito.length === 0) ? (
        <div className="grid h-screen place-content-center bg-white dark:bg-base-100 px-4">
          <div className="text-center">
            <h1 className="text-9xl font-black text-gray-200 dark:text-gray-500">Ups!</h1>

            <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">Carrito vacío</p>

            <p className="mt-4 text-gray-500 dark:text-gray-100">Visita nuestro catálogo para agregar productos a tu carrito.</p>

          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <header className="text-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-200 sm:text-3xl">
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
                  <div className="space-y-0.5 text-base text-gray-700 dark:text-gray-400 flex justify-between font-medium">
                    <span className="text-lg">Total</span>
                    <span>{"$" + currentCarritoPrice / 100}</span>
                  </div>

                  <MercadoPagoButton />

                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
