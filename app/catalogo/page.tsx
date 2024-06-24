import { fetchProductsPages, fetchProductsPagesWithFilters, getProductsCategories } from '@/app/lib/queries';
// import { fetchProductsPages, fetchProductsPagesWithFilters, getProductsCategories } from '@/app/lib/queries_local';

import CardsSkeleton from '@/app/ui/catalogo/cardsSkeleton';
import Pagination from '@/app/ui/catalogo/pagination';
import SearchBar from '@/app/ui/catalogo/searchBar';
import Cards from '@/app/ui/catalogo/cards';
import { Suspense } from "react";
import { Metadata } from 'next';
import ToggleButton from '../ui/catalogo/toggleButton';
import CategoryFilter from '../ui/catalogo/categoryFilter';
export const metadata: Metadata = { title: 'Catalogo de productos - LibreMercado' };

export default async function Catalogo({ searchParams }: { searchParams?: { page?: number, query?: string, discounted?: string, category?: string } }) {

	const query = searchParams?.query || '';
	const discounted: boolean = (searchParams?.discounted === 'true');
	const currentPage = Number(searchParams?.page) || 1;
	const productCategories = await getProductsCategories();
	let totalPages;
	const categories = Array.isArray(searchParams?.category)
		? searchParams?.category
		: typeof searchParams?.category === 'string'
			? [searchParams?.category]
			: []
		;

	if (discounted || categories.length > 0) {
		totalPages = await fetchProductsPagesWithFilters(query, { discounted, categories });
	} else {
		totalPages = await fetchProductsPages(query);
	}

	return (
		<section className="text-gray-600 body-font">
			<SearchBar />
			<ToggleButton />

			<div className="flex flex-col md:flex-row gap-4">
				{/* Filters Section */}
				<div className="md:w-1/4">
					{/* Content for filters */}
					<div className="p-4 bg-white border border-gray-300 dark:border-gray-600 dark:bg-gray-900">
						<CategoryFilter categoryNames={productCategories} />
						{/* Place your filter components here */}
					</div>
				</div>

				{/* Products Section */}
				<div className="md:flex-1">
					{/* Content for products */}
					<div className="p-4 bg-white border border-gray-300 dark:border-gray-600 dark:bg-gray-900">
						<Suspense key={query + currentPage} fallback={<CardsSkeleton />}>
							<Cards query={query} currentPage={currentPage} discounted={discounted} categories={categories} />
							<div className="mb-5 mt-5 flex w-full justify-center">
								<Pagination totalPages={totalPages} />
							</div>
						</Suspense>
						{/* Place your product components here */}
					</div>
				</div>
			</div>





		</section>
	);
}
