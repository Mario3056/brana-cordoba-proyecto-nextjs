import Card from './card';

import { getProductsByPage, getFilteredProductsByPage, getProductsByPageWithFilters, getSearchedProductsByPageWithFilters } from '@/app/lib/queries';
// import { getProductsByPage, getFilteredProductsByPage, getProductsByPageWithFilters, getSearchedProductsByPageWithFilters } from '@/app/lib/queries_local';

export default async function Cards({
    query,
    currentPage,
    discounted
}: {
    query: string;
    currentPage: number;
    discounted: boolean;
}) {
    const filters = { discounted };
    const products = (query == '')
		? await getProductsByPageWithFilters(currentPage, filters)
		: await getSearchedProductsByPageWithFilters(currentPage, query, filters)
    ;
    
    return (
        <div className="container px-5 pt-5 pb-10 mx-auto">
				<div className="flex flex-wrap -m-4">
					{products.map((product) => (
						<Card key={product.id} product={product} />
					))}
				</div>
			</div>
    );
}