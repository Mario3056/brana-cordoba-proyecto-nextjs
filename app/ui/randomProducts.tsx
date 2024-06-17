// import { getRandomProducts } from '@/app/lib/queries_local';
import { getRandomProducts } from '@/app/lib/queries';

import Image from 'next/image';
import Link from 'next/link';

export default async function RandomProducts() {
	const frontpageProducts = await getRandomProducts(4);

	return ( <>
		<h2 className="text-lg font-bold text-center"> Algunos de nuestros productos </h2>
		<ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{
				frontpageProducts.map( p =>
					<li key={p.id}>
						<Link href={"/producto/" + p.id} aria-label={"Ver producto " + p.name} className="group block overflow-hidden">
							<Image src={p.image} width={600} height={450} priority alt={p.name} className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]" />
							<div className="relative bg-white pt-3">
								<h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">{p.name}</h3>
								<p className="mt-2"> <span className="tracking-wider text-gray-900">{"$" + p.price/100}</span> </p>
							</div>									
						</Link>
					</li> )
			}
		</ul>
	</>	);
}