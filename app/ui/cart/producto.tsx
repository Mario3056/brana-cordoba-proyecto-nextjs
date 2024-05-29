'use client';

import type { Product } from '@/app/lib/types';
import { useCartStore } from '@/app/lib/cart/useCartStore';
import { DeleteSymbol } from '@/app/ui/icons';
import Image from 'next/image';

export default function Producto({ product }: { product: Product }) {
    const removeFromCarrito = useCartStore(state => state.removeFromCart);

    return (
        <>
            <Image
                src={product.image}
                alt={product.description}
				width={128}
				height={128}
                className="size-16 rounded object-cover"
            />

            <div>
                <h3 className="text-sm text-gray-900">{product.name}</h3>

				<div className="mt-0.5 space-y-px text-[10px] text-gray-600">
					<span>{product.category}</span>
				</div>
            </div>

            <div className="flex flex-1 items-center justify-end gap-2">
                <h3 className="text-sm text-gray-900">{"$" + (product.price / 100)}</h3>

                <button className="text-gray-600 transition hover:text-red-600" onClick={() => removeFromCarrito(product)}>
                    <span className="sr-only">Remove item</span>

                    <DeleteSymbol />
                </button>
            </div>
        </>
    );
}