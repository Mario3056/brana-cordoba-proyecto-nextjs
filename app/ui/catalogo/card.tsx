import { renderPriceWithDiscount, shortenString } from '@/app/lib/utils';
import type { Product } from '@/app/lib/types';
import StarRating from '@/app/ui/starRating';
import Image from 'next/image';
import Link from 'next/link';

export default function Card( {product}: {product: Product}) {
	const {
		renderedPrice,
		hasDiscount,
		renderedPriceAfterDiscount,
		renderedDiscountText
	} = renderPriceWithDiscount(product.price, product.discount);

    return (
        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
			<Link href={"/producto/" + product.id} aria-label={"Ver producto " + product.name} className="group block overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.description}
					width={600}
					height={450}
                    className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                />

                <div className="relative bg-base-100 pt-3 ">
                    <h3 className="text-xs text-gray-700 dark:text-slate-400 group-hover:underline group-hover:underline-offset-4">
                        {shortenString(product.name)}
                    </h3>

					<p className="mt-2">					
						{ hasDiscount ? <> <span className="tracking-wider text-gray-400 dark:text-gray-600 line-through">{"$" + renderedPrice}</span>
										   <span className="tracking-wider text-gray-900 dark:text-gray-300 pl-2">{"$" + renderedPriceAfterDiscount}</span>
										</>
									  : <span className="tracking-wider text-gray-900 dark:text-white"> {"$" + renderedPrice} </span>
						}
                    </p>
					
					{ hasDiscount && <p className='text-indigo-600 dark:text-indigo-400'>{renderedDiscountText}</p> }

					<span> <StarRating rating={product.rating}/> </span>
                </div>
            </Link>
        </div>
    );
}