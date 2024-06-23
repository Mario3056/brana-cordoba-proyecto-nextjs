// import { getRandomProducts } from '@/app/lib/queries_local';
import { getRandomProducts } from '@/app/lib/queries';

import { renderPriceWithDiscount, shortenString } from '@/app/lib/utils';
import type { Product } from '@/app/lib/types';
import Image from 'next/image';
import Link from 'next/link';

export default async function RandomProducts() {
	const frontpageProducts = await getRandomProducts(4);

	return (
		<>
			<h2 className="text-lg font-bold text-center py-3 dark:text-gray-100"> Algunos de nuestros productos </h2>
			<ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{ frontpageProducts.map(p => <FrontpageCard key={p.id} product={p} />) }
			</ul>
		</>);
}

function FrontpageCard({product}:{product: Product}) {
	const {
		renderedPrice,
		hasDiscount,
		renderedPriceAfterDiscount,
		renderedDiscountText
	} = renderPriceWithDiscount(product.price, product.discount);
	
	return (
		<li>
			<Link href={"/producto/" + product.id} aria-label={"Ver producto " + product.name} className="group block overflow-hidden">
				<Image src={product.image} width={600} height={450} priority alt={product.name} className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]" />
				<div className="relative pt-3 bg-base-100">
					<h3 className="text-xs text-gray-700 dark:text-slate-400 group-hover:underline group-hover:underline-offset-4">{shortenString(product.name)}</h3>
					{ !hasDiscount ?
							<span className="title-font font-medium text-2xl text-gray-900 dark:text-gray-300">{"$" + renderedPrice}</span>
						:
							<div>
								<p className="title-font font-medium text-2xl text-gray-400 dark:text-gray-600 line-through">{"$" + renderedPrice}</p>
								<p className="title-font font-medium text-2xl text-gray-900 dark:text-gray-200">{"$" + renderedPriceAfterDiscount}</p>
							</div>
					}
					
					{ hasDiscount && <p className="text-lg text-center text-gray-900 dark:text-gray-300">{renderedDiscountText}</p> }
				</div>
			</Link>
		</li>
	);
}