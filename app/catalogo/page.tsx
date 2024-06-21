import { fetchProductsPages } from '@/app/lib/queries';
// import { fetchProductsPages } from '@/app/lib/queries_local';

import CardsSkeleton from '@/app/ui/catalogo/cardsSkeleton';
import Pagination from '@/app/ui/catalogo/pagination';
import SearchBar from '@/app/ui/catalogo/searchBar';
import Cards from '@/app/ui/catalogo/cards';
import { Suspense } from "react";

import { Metadata } from 'next';
export const metadata: Metadata = { title: 'Catalogo de productos - LibreMercado' };

export default async function Catalogo({ searchParams }: { searchParams?: { page?: number, query?: string } }) {

	const query = searchParams?.query || '';
	const currentPage = Number(searchParams?.page) || 1;
	const totalPages = await fetchProductsPages(query);

	return (
		<section className="text-gray-600 body-font">
			<SearchBar />
			<Suspense key={query + currentPage} fallback={<CardsSkeleton />}>
				<Cards query={query} currentPage={currentPage} />
				<div className="mb-5 mt-5 flex w-full justify-center">
        			<Pagination totalPages={totalPages} />
      			</div>
			</Suspense>
		</section>
	);
}
