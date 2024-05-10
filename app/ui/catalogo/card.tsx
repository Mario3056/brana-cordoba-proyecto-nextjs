import type { Product } from '@/app/lib/types';
import StarRating from '@/app/ui/starRating';

import Image from 'next/image';
import Link from 'next/link';

export default function Card( {product}: {product: Product}) {
    return (
        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
			<Link href={"/producto/" + product.id} className="group block overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.description}
					width={600}
					height={450}
                    className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                />

                <div className="relative bg-white pt-3">
                    <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                        {product.name}
                    </h3>

                    <p className="mt-2">
                        <span className="tracking-wider text-gray-900"> {"$" + (product.price / 100)} </span>
                    </p>
					
					<span> <StarRating rating={product.rating}/> </span>
                </div>
            </Link>
        </div>
    );
}