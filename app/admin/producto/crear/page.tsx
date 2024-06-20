import { Metadata } from 'next';
export const metadata: Metadata = { title: 'Crear producto - LibreMercado' };

import ProductEditForm from '@/app/ui/admin/productEditor';
import { Product, emptyProduct, placeholderProduct } from '@/app/lib/types.d';

// import { getProductById } from '@/app/lib/queries'
import { getProductById } from '@/app/lib/queries_local'

// import { createProduct } from '@/app/lib/actions';
import { createProduct } from '@/app/lib/actions_local';

export default async function AdminProductCreator() {
	return (
		<main className="flex justify-center">
			<ProductEditForm product={emptyProduct} serverAction={createProduct} />
		</main>
	);
 }