import Table from '@/app/ui/admin/productos/table';
import SearchBar from '@/app/ui/catalogo/searchBar';
import Pagination from '@/app/ui/catalogo/pagination';

import { fetchProductsPages } from '@/app/lib/queries_local';
// import { fetchProductsPages } from '@/app/lib/queries';

import { Metadata } from 'next';
export const metadata: Metadata = { title: 'Productos - LibreMercado' };

 export default async function Productos({ searchParams }: { searchParams?: { page?: number, query?: string } }) {
	const query = searchParams?.query || '';
	const currentPage = Number(searchParams?.page) || 1;
	const totalPages = await fetchProductsPages(query);

	return (
		<section className="text-gray-600 body-font">
			<SearchBar />
			<Table query={query} currentPage={currentPage}/>
			<div className="mb-5 mt-5 flex w-full justify-center">
        		<Pagination totalPages={totalPages} />
      		</div>
		</section>
	);
 }