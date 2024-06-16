'use client';

import { useCartStore } from "@/app/lib/cart/useCartStore";
import useFromStore from "@/app/lib/cart/hooks/useFromStore";
import Link from 'next/link';

import { CartSymbol } from '@/app/ui/icons';

export default function CartButton() {
    const totalItems = useFromStore(useCartStore, state => state.totalItems)

	return <>
		<Link href="/carrito" tabIndex={-1} aria-label="Ir al carrito de compras" >
			<div tabIndex={0} role="button" aria-label="Carrito de compras" className="btn btn-ghost btn-circle">
				<div tabIndex={-1} className="indicator">
					<CartSymbol />
					<span className={totalItems === 0 ? "hidden" : "badge badge-sm indicator-item"}>{totalItems}</span>
				</div>
			</div>
        </Link>
	</>;
}