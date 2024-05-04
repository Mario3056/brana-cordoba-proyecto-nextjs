// import { getProducts } from '@/app/lib/queries'
import { getProducts } from '@/app/lib/queries_local'

export default async function Catalogo() {
	const p = await getProducts();
	return (
		<>
			<h1>Catalogo: actualmente {p.length} productos</h1>
		</>
	);
}
