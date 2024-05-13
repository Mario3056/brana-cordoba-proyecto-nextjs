import Card from "../ui/catalogo/card";
import SearchBar from '@/app/ui/catalogo/searchBar';

// import { getProductsByPage, getFilteredProductsByPage } from '@/app/lib/queries';
import { getProductsByPage, getFilteredProductsByPage } from '@/app/lib/queries_local';

export default async function Catalogo({ searchParams } : { searchParams?: {page?: number, query?: string} } ) {
	const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const products = (query == '')
					? await getProductsByPage(currentPage)
					: await getFilteredProductsByPage(currentPage, query);
	
	return (
		<section className="text-gray-600 body-font">
			<SearchBar />
			
			<div className="container px-5 py-16 mx-auto">
				<div className="flex flex-wrap -m-4">
					{products.map((product) => (
						<Card key={product.id} product={product} />
					))}
				</div>
			</div>
			
			{/* <Page Selector /> */}
		</section>
	);
}
