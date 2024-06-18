import Head from 'next/head';
import ProductEditForm from '@/app/ui/admin/productEditor';
import { Product } from '@/app/lib/types';
import TitleEffect from '@/app/ui/setTitle';

import { getProductById } from '@/app/lib/queries'
// import { getProductById } from '@/app/lib/queries_local'

import { editProduct } from '@/app/lib/actions';
// import { editProduct } from '@/app/lib/actions_local';

import { Metadata } from 'next';
export const metadata: Metadata = { title: 'Editar producto - LibreMercado' };

export default async function AdminProductEditor({ params }: { params: { id: string } }) {
	const product: Product = await getProductById(params.id);
	const editProductAction = editProduct.bind(null, product)
	
	return (
		<main className="flex justify-center">
			<TitleEffect title={product.name} />
			<ProductEditForm product={product} serverAction={editProductAction} />
		</main>
	);
 }