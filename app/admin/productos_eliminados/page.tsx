import Table from '@/app/ui/admin/productos/table';
import { fetchProductsPages } from '@/app/lib/queries_local';
import SearchBar from '@/app/ui/catalogo/searchBar';
import Pagination from '@/app/ui/catalogo/pagination';

 export default async function ProductosEliminados({ searchParams }: { searchParams?: { page?: number, query?: string } }) {
	{/* fetch deleted products */}
	return (
		<section className="text-gray-600 body-font">
			{/* for each deleted product: render name + id + <RestoreDeletedProductButton id={id} /> */}
		</section>
	);
 }