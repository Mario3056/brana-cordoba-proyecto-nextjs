import Card from './card';
import { getProductsByPage, getFilteredProductsByPage } from '@/app/lib/queries_local';

export default async function Table({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {

    const products = (query == '')
		? await getProductsByPage(currentPage)
		: await getFilteredProductsByPage(currentPage, query);
    
    return (
        <div className="container px-5 py-16 mx-auto">
				<div className="flex flex-wrap -m-4">
					{products.map((product) => (
						<Card key={product.id} product={product} />
					))}
				</div>
			</div>
    );
}