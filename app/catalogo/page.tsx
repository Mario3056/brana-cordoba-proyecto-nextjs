import { fetchProductsPages, fetchProductsPagesWithFilters } from '@/app/lib/queries';
// import { fetchProductsPages, fetchProductsPagesWithFilters } from '@/app/lib/queries_local';

import CardsSkeleton from '@/app/ui/catalogo/cardsSkeleton';
import Pagination from '@/app/ui/catalogo/pagination';
import SearchBar from '@/app/ui/catalogo/searchBar';
import Cards from '@/app/ui/catalogo/cards';
import { Suspense } from "react";
import { Metadata } from 'next';
import ToggleButton from '../ui/catalogo/toggleButton';
export const metadata: Metadata = { title: 'Catalogo de productos - LibreMercado' };

export default async function Catalogo({ searchParams }: { searchParams?: { page?: number, query?: string , discounted?: string} }) {

	const query = searchParams?.query || '';
	const discounted: boolean = (searchParams?.discounted === 'true');
	const currentPage = Number(searchParams?.page) || 1;
	let totalPages;

	if (discounted){
		totalPages = await fetchProductsPagesWithFilters(query, { discounted });
	}else{
		totalPages = await fetchProductsPages(query);
	}

	return (
		<section className="text-gray-600 body-font">
			<SearchBar />
			<ToggleButton/>
			<Suspense key={query + currentPage} fallback={<CardsSkeleton />}>
				<Cards query={query} currentPage={currentPage} discounted={discounted}/>
				<div className="mb-5 mt-5 flex w-full justify-center">
					<Pagination totalPages={totalPages} />
				</div>
			</Suspense>
		</section>
	);
}
