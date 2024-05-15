import TableSkeleton from '../ui/catalogo/tableSkeleton';
import SearchBar from '@/app/ui/catalogo/searchBar';

// import { getProductsByPage, getFilteredProductsByPage } from '@/app/lib/queries';
import { getProductsByPage, getFilteredProductsByPage } from '@/app/lib/queries_local';
import Table from "../ui/catalogo/table";
import { Suspense } from "react";

export default async function Catalogo({ searchParams }: { searchParams?: { page?: number, query?: string } }) {

	const query = searchParams?.query || '';
	const currentPage = Number(searchParams?.page) || 1;

	return (
		<section className="text-gray-600 body-font">
			<SearchBar />
			<Suspense key={query + currentPage} fallback={<TableSkeleton />}>
				<Table query={query} currentPage={currentPage} />
			</Suspense>
			{/* <Page Selector /> */}
		</section>
	);
}
