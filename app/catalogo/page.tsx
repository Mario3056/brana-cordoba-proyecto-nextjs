// import { getProducts } from '@/app/lib/queries.ts'
import { getProducts } from '@/app/lib/queries_local.ts'

export default async function Catalogo() {
	const p = await getProducts();
	return (
		<>
			<h1>Catalogo: actualmente {p.length} productos</h1>
		</>
	);
}
