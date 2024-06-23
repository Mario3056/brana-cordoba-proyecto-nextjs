"use client";

import type { CartProduct, Product } from "@/app/lib/types";
import { useCartStore } from "@/app/lib/cart/useCartStore";
import { DeleteSymbol } from '@/app/ui/icons';
import Image from "next/image";
import { renderPriceWithDiscount } from '@/app/lib/utils';

export default function Producto({ product }: { product: CartProduct }) {
  const removeFromCarrito = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  
  const {
    renderedPrice,
    hasDiscount,
    renderedPriceAfterDiscount,
    renderedDiscountText
  } = renderPriceWithDiscount(product.price, product.discount);

  return (
    <>
      <Image
        src={product.image}
        alt={product.name}
        width={128}
        height={128}
        className="size-16 rounded object-cover"
      />

      <div>
        <h3 className="text-base text-gray-900 dark:text-gray-300">{product.name}</h3>
        <div className="mt-0.5 space-y-px text-[11px] text-gray-600 dark:text-gray-400">
          <span>{product.category}</span>
        </div>
        <h3 className="text-sm text-indigo-500 dark:text-indigo-400">{renderedDiscountText}</h3>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2">
        { hasDiscount ? 
          <>
            <h3 className="text-base tracking-wider text-gray-400 dark:text-gray-500 line-through">{"$" + renderedPrice}</h3>
            <h3 className="text-base text-gray-900 dark:text-gray-300">{"$" + renderedPriceAfterDiscount}</h3>
          </>
          :
          <h3 className="text-base text-gray-900 dark:text-gray-300">{"$" + renderedPrice}</h3>
        }					

        <button
          className="w-8 h-8 bg-white dark:bg-gray-400 text-gray-700 border border-gray-300 rounded transition-transform transform-gpu active:scale-95"
          onClick={() => updateQuantity(product, product.quantity - 1)}
        >
          -
        </button>
        <span className="px-1 text-sm text-gray-700 dark:text-gray-300">{product.quantity}</span>
        <button
          className="w-8 h-8 bg-white dark:bg-gray-400 text-gray-700 border border-gray-300 rounded transition-transform transform-gpu active:scale-95"
          onClick={() => updateQuantity(product, product.quantity + 1)}
        >
          +
        </button>

        <button
          className="text-gray-600 dark:text-gray-300 transition hover:text-red-600"
          onClick={() => removeFromCarrito(product)}
        >
          <span className="sr-only">Remove item</span>

          <DeleteSymbol />
        </button>
      </div>
    </>
  );
}
