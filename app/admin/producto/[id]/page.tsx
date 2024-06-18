import Head from 'next/head';
import Card from '@/app/ui/admin/producto/card';

// import { getProductById } from '@/app/lib/queries_local'
import { getProductById } from '@/app/lib/queries'

export default async function AdminProductCard({params}: { params: { id: string} }) {
	const product = await getProductById(params.id);
	return <>
		<Head> <title> {product.name} </title> </Head>
		<Card product={product} />
	</>;
}