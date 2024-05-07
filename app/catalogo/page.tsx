import Card from "../ui/catalogo/card";
import { placeholderProduct } from '@/app/lib/types.d';

// import { getProductsByPage, getProductById, debug_getAllProducts } from '@/app/lib/queries';
import { getProductsByPage, getProductById, debug_getAllProducts } from '@/app/lib/queries_local';

export default async function Catalogo() {
	return (
		<section className="text-gray-600 body-font">
			
			<div className="container px-5 py-24 mx-auto">
			
				<div className="flex flex-wrap -m-4">
					<Card product={placeholderProduct} />
					<Card product={placeholderProduct} />
					<Card product={placeholderProduct} />
					<Card product={placeholderProduct} />
					<Card product={placeholderProduct} />
					<Card product={placeholderProduct} />
					<Card product={placeholderProduct} />
					<Card product={placeholderProduct} />
				</div>
			</div>
		</section>
	);
}
