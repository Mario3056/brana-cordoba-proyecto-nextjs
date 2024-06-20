// import { API_getAllProducts } from '@/app/lib/queries'
import { API_getAllProducts } from '@/app/lib/queries_local'

export async function GET(request: Request) {
	const allProducts = await API_getAllProducts();
	return Response.json( allProducts );
}