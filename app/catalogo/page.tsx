import Card from "../ui/catalogo/card";

// import { getProductsByPage, getProductById, debug_getAllProducts } from '@/app/lib/queries';
import { getProductsByPage } from '@/app/lib/queries_local';

export default async function Catalogo() {
	const products = await getProductsByPage(1);

	return (
		<section className="text-gray-600 body-font">
			
			<div className="container px-5 py-24 mx-auto">
			
				<div className="flex flex-wrap -m-4">
					{products.map((product) => (
						<Card product={product} />
					))}
				</div>
			</div>
		</section>
	);
}
