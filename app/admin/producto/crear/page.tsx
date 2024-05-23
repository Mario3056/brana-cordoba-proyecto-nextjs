import ProductEditForm from '@/app/ui/admin/productEditor';
import { getProductById } from '@/app/lib/queries_local'
import { Product, emptyProduct, placeholderProduct } from '@/app/lib/types.d';
import { createProduct } from '@/app/lib/actions';

export default async function AdminProductCreator() {
	return (
		<main className="flex justify-center">
			<ProductEditForm product={placeholderProduct} serverAction={createProduct}/>
		</main>
	);
 }