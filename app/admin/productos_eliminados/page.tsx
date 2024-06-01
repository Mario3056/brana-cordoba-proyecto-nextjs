import { getDeletedProducts } from '@/app/lib/queries_local';
import { RestoreDeletedProductButton } from '@/app/ui/admin/productos/buttons';

export default async function ProductosEliminados({ searchParams }: { searchParams?: { page?: number, query?: string } }) {
	const deletedProducts = await getDeletedProducts();
	
	return (
		<section className="text-gray-600 body-font mx-4 grid grid-cols-4 justify-center ">
			{ (deletedProducts.length > 0) &&
			   deletedProducts.map((p) =>
					<div key={p.id} className=" border border-black p-2 my-2 w-fit flex flex-row">
						<p>{p.name}</p>
						<RestoreDeletedProductButton id={p.id} />
					</div>)
			}
		</section>
	);
 }