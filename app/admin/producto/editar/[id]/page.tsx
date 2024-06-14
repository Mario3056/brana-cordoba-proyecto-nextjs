import ProductEditForm from '@/app/ui/admin/productEditor';
import { getProductById } from '@/app/lib/queries_local'
import { Product } from '@/app/lib/types';

// import { editProduct } from '@/app/lib/actions';
import { editProduct } from '@/app/lib/actions_local';

export default async function AdminProductEditor({ params }: { params: { id: string } }) {
	const product: Product = await getProductById(params.id);
	const editProductAction = editProduct.bind(null, product)
	
	return (
		<main className="flex justify-center">
			<ProductEditForm product={product} serverAction={editProductAction} />
		</main>
	);
 }