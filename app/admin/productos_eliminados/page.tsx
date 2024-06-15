// import { getDeletedProducts } from '@/app/lib/queries'
import { getDeletedProducts } from '@/app/lib/queries_local'

import Table from '@/app/ui/admin/productos/deletedProductsTable';

export default async function ProductosEliminados() {
	const deletedProducts = await getDeletedProducts();
		
	return (
		<div className="mx-auto">
			<h1 className="text-center font-bold text-lg underline"> Productos Eliminados </h1>
			{ (deletedProducts.length == 0) && <p>Cuando elimine un producto, aparecerá aqui si es necesario restaurarlo (o puede ser eliminado definitivamente)</p> }			
			{ (deletedProducts.length > 0) && <Table products={deletedProducts} /> }					
		</div>
	);
 }